import db from '@/db';
import { user } from '@/db/schema';
import { generateIdFromEntropySize } from 'lucia';

import { eq } from 'drizzle-orm';
import { lucia, validateRequest } from './auth';
import { hashPassword, verifyPassword } from './password';
import { ActionError } from './safe-action';

export async function logout() {
  const { session } = await validateRequest();
  if (session) {
    await lucia.invalidateSession(session.id);
  }
  return lucia.createBlankSessionCookie();
}

export async function createUser(username: string, password: string) {
  const registeredUser = await db.query.user.findFirst({
    where: eq(user.username, username),
  });
  if (registeredUser) {
    throw new ActionError('CONFLICT', 'User already exists');
  }

  const passwordHash = await hashPassword(password);

  const userId = generateIdFromEntropySize(16);
  const [first] = await db
    .insert(user)
    .values({
      id: userId,
      username: username,
      password_hash: passwordHash,
    })
    .returning();

  return first.id;
}

export async function authenticateUser(username: string, password: string) {
  const registeredUser = await db.query.user.findFirst({
    where: eq(user.username, username),
  });

  if (!registeredUser) {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  const validPassword = await verifyPassword(
    registeredUser.password_hash,
    password
  );
  if (!validPassword) {
    throw new ActionError('NOT_AUTHORIZED', 'Invalid user or password');
  }

  return registeredUser.id;
}
