import { eq } from 'drizzle-orm';
import db from '..';
import { passwordReset } from '../schema';

export const deleteAllByUserId = async (userId: string, trans = db) => {
  await trans.delete(passwordReset).where(eq(passwordReset.userId, userId));
};

export const getPasswordResetByUserId = async (userId: string, trans = db) => {
  return await db.query.passwordReset.findFirst({
    where: eq(passwordReset.userId, userId),
  });
};

export const getPasswordResetByTokenHash = async (
  tokenHash: string,
  trans = db
) => {
  return await trans.query.passwordReset.findFirst({
    where: eq(passwordReset.tokenHash, tokenHash),
  });
};

export const createPasswordReset = async (
  userId: string,
  tokenHash: string,
  email: string,
  expiresAt: Date,
  trans = db
) => {
  const [reset] = await trans
    .insert(passwordReset)
    .values({
      tokenHash,
      userId,
      email,
      expires_at: expiresAt,
    })
    .returning();
  return reset;
};
