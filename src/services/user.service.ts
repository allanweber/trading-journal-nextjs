import db from '@/db';
import {
  emailVerification,
  passwordReset,
  user,
  userAccounts,
  userProfile,
} from '@/db/schema';
import {
  generateToken,
  hashPassword,
  hashToken,
  verifyPassword,
} from '@/lib/password';
import { ActionError } from '@/lib/safe-action';
import { GoogleUser } from '@/types';
import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import { TimeSpan, createDate, isWithinExpirationDate } from 'oslo';
import { generateCode } from './email-verification.service';
import { sendActivationEmail, sendResetPasswordEmail } from './emails.service';

export async function getUserByEmail(email: string) {
  return await db.query.user.findFirst({
    where: eq(user.email, email),
  });
}

export async function createUser(email: string, password: string) {
  const registeredUser = await getUserByEmail(email);

  if (registeredUser) {
    throw new ActionError('EXISTING_USER_NAME', 'User already exists');
  }

  const salt = generateIdFromEntropySize(16);
  const passwordHash = await hashPassword(password, salt);
  const userId = generateIdFromEntropySize(16);
  const code = generateCode();

  const createdUser = await db.transaction(async (trans) => {
    const [createdUser] = await trans
      .insert(user)
      .values({
        id: userId,
        email: email,
        email_verified: false,
      })
      .returning();

    await trans
      .insert(userAccounts)
      .values({
        userId,
        accountType: 'email',
        passwordHash,
        salt,
      })
      .execute();

    await trans
      .insert(userProfile)
      .values({
        userId,
        displayName: email,
      })
      .execute();

    await trans
      .delete(emailVerification)
      .where(eq(emailVerification.userId, userId));

    await trans
      .insert(emailVerification)
      .values({
        code,
        userId,
        email,
        expires_at: createDate(new TimeSpan(15, 'm')),
      })
      .execute();

    await sendActivationEmail(email, code);

    return createdUser;
  });

  return createdUser.id;
}

export async function verifyCredentials(email: string, password: string) {
  const registeredUser = await getUserByEmail(email);

  if (!registeredUser) {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  if (!registeredUser.email_verified) {
    throw new ActionError('EMAIL_NOT_VERIFIED', 'Email not verified');
  }

  const userAccount = await db.query.userAccounts.findFirst({
    where: eq(userAccounts.userId, registeredUser.id),
  });

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

  await db.transaction(async (trans) => {
    await trans
      .delete(passwordReset)
      .where(eq(passwordReset.userId, registeredUser.id));

    await trans
      .insert(passwordReset)
      .values({
        tokenHash,
        userId: registeredUser.id,
        email: registeredUser.email,
        expires_at: createDate(new TimeSpan(15, 'm')),
      })
      .execute();

    await sendResetPasswordEmail(email, token);
  });
}

export async function changePassword(
  token: string,
  email: string,
  password: string
) {
  const userId = await validateChangePasswordToken(token);

  const passwordChangeRequest = await db.query.passwordReset.findFirst({
    where: eq(passwordReset.userId, userId),
  });

  if (!passwordChangeRequest || passwordChangeRequest.email !== email) {
    throw new ActionError('invalid-token', 'Invalid token');
  }

  const salt = generateIdFromEntropySize(16);
  const passwordHash = await hashPassword(password, salt);
  await db.transaction(async (trans) => {
    await trans
      .update(userAccounts)
      .set({
        passwordHash,
        salt,
      })
      .where(eq(user.id, userId))
      .execute();

    await trans
      .delete(passwordReset)
      .where(eq(passwordReset.userId, userId))
      .execute();
  });
}

export async function validateChangePasswordToken(token: string) {
  const compareToken = await hashToken(token);

  const passwordResetRecord = await db.query.passwordReset.findFirst({
    where: eq(passwordReset.tokenHash, compareToken),
  });

  if (!passwordResetRecord) {
    throw new ActionError('invalid-token', 'Invalid token');
  }

  if (!isWithinExpirationDate(passwordResetRecord.expires_at)) {
    throw new ActionError('invalid-token', 'Token expired');
  }

  return passwordResetRecord.userId;
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.query.userAccounts.findFirst({
    where: eq(userAccounts.googleId, googleId),
  });
}

export async function createGoogleUser(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email);

  const userId = await db.transaction(async (trans) => {
    if (!existingUser) {
      const userId = generateIdFromEntropySize(16);
      const [createdUser] = await trans
        .insert(user)
        .values({
          id: userId,
          email: googleUser.email,
          email_verified: true,
        })
        .returning();
      existingUser = createdUser;
    }

    await trans.insert(userAccounts).values({
      userId: existingUser.id,
      accountType: 'google',
      googleId: googleUser.sub,
    });

    await trans.insert(userProfile).values({
      userId: existingUser.id,
      displayName: googleUser.name,
      fistName: googleUser.given_name,
      lastName: googleUser.family_name,
      image: googleUser.picture,
    });

    return existingUser.id;
  });

  return userId;
}
