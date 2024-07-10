import { and, eq } from 'drizzle-orm';
import db from '..';
import { emailVerification } from '../schema';

export const deleteByUserId = async (userId: string, trans = db) => {
  return await trans
    .delete(emailVerification)
    .where(eq(emailVerification.userId, userId));
};

export const createEmailVerification = async (
  userId: string,
  code: string,
  email: string,
  expiresAt: Date,
  trans = db
) => {
  const [verification] = await trans
    .insert(emailVerification)
    .values({
      code,
      userId,
      email,
      expires_at: expiresAt,
    })
    .returning();
  return verification;
};

export const findByCodeAndEmail = async (
  code: string,
  email: string,
  trans = db
) => {
  return await trans.query.emailVerification.findFirst({
    where: and(
      eq(emailVerification.code, code),
      eq(emailVerification.email, email)
    ),
  });
};
