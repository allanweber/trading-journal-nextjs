import db from '@/db';
import { emailVerification, user } from '@/db/schema';
import { validateRequest } from '@/lib/auth';
import { ActionError } from '@/lib/safe-action';
import { and, eq } from 'drizzle-orm';
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo';
import { alphabet, generateRandomString } from 'oslo/crypto';

export async function sendVerificationEmail(email: string) {
  const registeredUser = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (!registeredUser) {
    throw new ActionError('USER_NOT_FOUND', 'User not found');
  }

  const verificationCode = generateCode();
  await db.transaction(async (trans) => {
    await trans
      .delete(emailVerification)
      .where(eq(emailVerification.userId, registeredUser.id));

    await trans
      .insert(emailVerification)
      .values({
        code: verificationCode,
        userId: registeredUser.id,
        email,
        expires_at: createDate(new TimeSpan(15, 'm')),
      })
      .execute();
  });
}

export function generateCode() {
  return generateRandomString(6, alphabet('0-9'));
}

export async function verifyEmailCode(code: string) {
  const session = await validateRequest();
  if (!session || !session.user) {
    throw new ActionError('NOT_AUTHORIZED', 'Not authorized');
  }

  const verification = await db.query.emailVerification.findFirst({
    where: and(
      eq(emailVerification.code, code),
      eq(emailVerification.email, session.user.email)
    ),
  });

  if (!verification || verification.code !== code) {
    throw new ActionError('INVALID_CODE', 'Invalid code');
  }

  if (!isWithinExpirationDate(verification.expires_at)) {
    throw new ActionError('INVALID_CODE', 'Invalid code');
  }

  await db.transaction(async (trans) => {
    await trans
      .update(user)
      .set({
        email_verified: true,
      })
      .where(eq(user.id, session.user.id));

    await trans
      .delete(emailVerification)
      .where(eq(emailVerification.id, verification.id));
  });
}
