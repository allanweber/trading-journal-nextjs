import db, { createTransaction } from '@/db';
import {
  createEmailVerification,
  deleteByUserId,
  findByCodeAndEmail,
} from '@/db/repositories/emailVerification.repository';
import {
  getUserByEmail,
  setUserVerified,
} from '@/db/repositories/user.repository';
import { validateRequest } from '@/lib/auth';
import { ActionError } from '@/lib/safe-action';
import { getTranslations } from 'next-intl/server';
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';
import { sendActivationEmail } from './emails.service';

function generateCode() {
  return generateRandomString(6, alphabet('0-9'));
}

export async function sendVerificationEmail(email: string, trans = db) {
  const registeredUser = await getUserByEmail(email, trans);

  if (!registeredUser) {
    const t = await getTranslations('errors');
    throw new ActionError('USER_NOT_FOUND', t('USER_NOT_FOUND'));
  }

  const verificationCode = generateCode();
  await deleteByUserId(registeredUser.id, trans);
  await createEmailVerification(
    registeredUser.id,
    verificationCode,
    email,
    createDate(new TimeSpan(15, 'm')),
    trans
  );
  await sendActivationEmail(email, verificationCode);
}

export async function verifyEmailCode(code: string) {
  const t = await getTranslations('errors');
  const session = await validateRequest();
  if (!session || !session.user) {
    throw new ActionError('NOT_AUTHORIZED', t('NOT_AUTHORIZED'));
  }

  const verification = await findByCodeAndEmail(code, session.user.email);

  if (!verification || verification.code !== code) {
    throw new ActionError('INVALID_CODE', t('INVALID_CODE'));
  }

  if (!isWithinExpirationDate(verification.expires_at)) {
    throw new ActionError('INVALID_CODE', t('INVALID_CODE'));
  }

  await createTransaction(async (trans) => {
    await setUserVerified(session.user.id, trans);
    await deleteByUserId(session.user.id, trans);
  });
}
