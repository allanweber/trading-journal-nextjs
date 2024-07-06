import { createTransaction } from '@/db';
import { createOrganization } from '@/db/repositories/organisation.repository';
import {
  createPasswordReset,
  deleteAllByUserId,
  getPasswordResetByTokenHash,
  getPasswordResetByUserId,
} from '@/db/repositories/passwordReset.repository';
import { createUser, getUserByEmail } from '@/db/repositories/user.repository';
import {
  createEmailAccount,
  createGoogleAccount,
  getAccountByUserId,
  linkGoogleAccount,
  updatePassword,
} from '@/db/repositories/userAccounts.repository';
import { addFreePlan } from '@/db/repositories/userPlans.repository';
import {
  createProfile,
  createStartProfile,
  updateWithGoogle,
} from '@/db/repositories/userProfile.repository';
import { addUserRole } from '@/db/repositories/userRoles.repository';
import {
  generateToken,
  hashPassword,
  hashToken,
  verifyPassword,
} from '@/lib/password';
import { ActionError } from '@/lib/safe-action';
import { GoogleUser } from '@/types';
import { generateIdFromEntropySize } from 'lucia';
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo';
import { sendVerificationEmail } from './email-verification.service';
import { sendResetPasswordEmail } from './emails.service';

export async function createPasswordUser(email: string, password: string) {
  const registeredUser = await getUserByEmail(email);

  if (registeredUser) {
    throw new ActionError('EXISTING_USER_NAME', 'User already exists');
  }

  const salt = generateIdFromEntropySize(16);
  const passwordHash = await hashPassword(password, salt);
  let userId;

  await createTransaction(async (trans) => {
    const org = await createOrganization(email, trans);
    const createdUser = await createUser(email, org.id, false, trans);
    userId = createdUser.id;

    await createEmailAccount(userId, passwordHash, salt, trans);
    await createStartProfile(userId, email, trans);
    await sendVerificationEmail(email, trans);
    await addUserRole(userId, 'admin', trans);
    await addFreePlan(createdUser.id, trans);

    return createdUser;
  });

  return userId!;
}

export async function createGoogleUser(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  await createTransaction(async (trans) => {
    if (!existingUser) {
      const org = await createOrganization(googleUser.email, trans);

      const createdUser = await createUser(
        googleUser.email,
        org.id,
        true,
        trans
      );
      await addUserRole(createdUser.id, 'admin', trans);
      await addFreePlan(createdUser.id, trans);

      existingUser = createdUser;
      await createGoogleAccount(existingUser.id, googleUser.sub, trans);
      await createProfile(
        existingUser.id,
        googleUser.name,
        googleUser.given_name,
        googleUser.family_name,
        googleUser.picture,
        googleUser.locale,
        trans
      );
    } else {
      await linkGoogleAccount(existingUser.id, googleUser.sub, trans);
      await updateWithGoogle(existingUser.id, googleUser, trans);
    }
  });

  return existingUser?.id!;
}

export async function verifyCredentials(email: string, password: string) {
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  if (!registeredUser.email_verified) {
    throw new ActionError('EMAIL_NOT_VERIFIED', 'Email not verified');
  }

  const userAccount = await getAccountByUserId(registeredUser.id);

  if (!userAccount) {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  if (userAccount.accountType === 'email') {
    const validPassword = await verifyPassword(
      userAccount.passwordHash!,
      password,
      userAccount.salt!
    );
    if (!validPassword) {
      throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
    }
  } else {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  return registeredUser.id;
}

export async function changePasswordRequest(email: string) {
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    throw new ActionError('USER_NOT_FOUND', 'User not found');
  }

  const token = await generateToken();
  const tokenHash = await hashToken(token);

  await createTransaction(async (trans) => {
    await deleteAllByUserId(registeredUser.id, trans);
    await createPasswordReset(
      registeredUser.id,
      tokenHash,
      email,
      createDate(new TimeSpan(15, 'm')),
      trans
    );
    await sendResetPasswordEmail(email, token);
  });
}

export async function changePassword(
  token: string,
  email: string,
  password: string
) {
  const userId = await validateChangePasswordToken(token);

  const passwordChangeRequest = await getPasswordResetByUserId(userId);

  if (!passwordChangeRequest || passwordChangeRequest.email !== email) {
    throw new ActionError('invalid-token', 'Invalid token');
  }

  const salt = generateIdFromEntropySize(16);
  const passwordHash = await hashPassword(password, salt);
  await createTransaction(async (trans) => {
    await updatePassword(userId, passwordHash, salt, trans);
    await deleteAllByUserId(userId, trans);
  });
}

export async function validateChangePasswordToken(token: string) {
  const compareToken = await hashToken(token);

  const passwordResetRecord = await getPasswordResetByTokenHash(compareToken);

  if (!passwordResetRecord) {
    throw new ActionError('invalid-token', 'Invalid token');
  }

  if (!isWithinExpirationDate(passwordResetRecord.expires_at)) {
    throw new ActionError('invalid-token', 'Token expired');
  }

  return passwordResetRecord.userId;
}
