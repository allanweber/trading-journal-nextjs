import db from '@/db';
import { session, user } from '@/db/schema';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';

import { getByUserId } from '@/db/repositories/userProfile.repository';
import env from '@/env';
import { verifyCredentials } from '@/services/user.service';
import { UserDisplay } from '@/types';
import { Google } from 'arctic';
import type { Session, User } from 'lucia';
import { clearSession, setSession } from './session';

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      emailVerified: attributes.email_verified,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  email: string;
  email_verified: boolean;
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        await clearSession();
      }
    } catch {}
    return result;
  }
);

export const getAuthenticatedUser = cache(async (): Promise<UserDisplay> => {
  const session = await validateRequest();
  if (!session || !session.user) {
    await clearSession();
  }
  const profile = await getByUserId(session.user?.id!);
  return {
    userId: session.user?.id!,
    displayName: profile?.displayName || session?.user?.email!,
    pictureUrl: profile?.image || undefined,
  };
});

export async function logout() {
  const { session } = await validateRequest();
  if (session) {
    await lucia.invalidateSession(session.id);
  }
  return lucia.createBlankSessionCookie();
}

export async function login(email: string, password: string) {
  const userId = await verifyCredentials(email, password);
  await setSession(userId);
}

export const googleAuth = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.HOST_NAME}/api/auth/google/callback`
);
