import { eq } from 'drizzle-orm';
import { generateIdFromEntropySize } from 'lucia';
import db from '..';
import { user } from '../schema';

export const createUser = async (
  email: string,
  organizationId: number,
  verified: boolean,
  trans = db
) => {
  const id = generateIdFromEntropySize(16);
  const [createdUser] = await trans
    .insert(user)
    .values({
      id,
      email,
      email_verified: verified,
      organizationId,
    })
    .returning();
  return createdUser;
};

export const getUserByEmail = async (email: string, trans = db) => {
  return await trans.query.user.findFirst({
    where: eq(user.email, email),
  });
};

export const setUserVerified = async (userId: string, trans = db) => {
  await trans
    .update(user)
    .set({
      email_verified: true,
    })
    .where(eq(user.id, userId));
};
