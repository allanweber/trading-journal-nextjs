import { eq } from 'drizzle-orm';
import db from '..';
import { userAccounts } from '../schema';

export const getAccountByUserId = async (userId: string, trans = db) => {
  return await db.query.userAccounts.findFirst({
    where: eq(userAccounts.userId, userId),
  });
};

export const getAccountByGoogleId = async (googleId: string, trans = db) => {
  return await trans.query.userAccounts.findFirst({
    where: eq(userAccounts.googleId, googleId),
  });
};

const createUserAccount = async (
  userId: string,
  accountType: 'email' | 'google',
  passwordHash?: string,
  salt?: string,
  googleId?: string,
  trans = db
) => {
  const [account] = await trans
    .insert(userAccounts)
    .values({
      userId,
      accountType,
      passwordHash,
      salt,
      googleId,
    })
    .returning();
  return account;
};

export const createEmailAccount = async (
  userId: string,
  passwordHash: string,
  salt: string,
  trans = db
) => {
  return createUserAccount(
    userId,
    'email',
    passwordHash,
    salt,
    undefined,
    trans
  );
};

export const createGoogleAccount = async (
  userId: string,
  googleId: string,
  trans = db
) => {
  return createUserAccount(
    userId,
    'google',
    undefined,
    undefined,
    googleId,
    trans
  );
};

export const linkGoogleAccount = async (
  userId: string,
  googleId: string,
  trans = db
) => {
  return trans
    .update(userAccounts)
    .set({ googleId })
    .where(eq(userAccounts.userId, userId))
    .execute();
};

export const updatePassword = async (
  userId: string,
  passwordHash: string,
  salt: string,
  trans = db
) => {
  await trans
    .update(userAccounts)
    .set({
      passwordHash,
      salt,
    })
    .where(eq(userAccounts.userId, userId))
    .execute();
};
