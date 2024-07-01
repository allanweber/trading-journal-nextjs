'use server';

import { lucia } from '@/lib/auth';
import { unauthenticatedAction } from '@/lib/safe-action';
import { createUser } from '@/lib/user-auth';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const signup = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      username: z
        .string({ message: 'username-required' })
        .min(4, { message: 'user-name-invalid-size' })
        .max(31, { message: 'user-name-invalid-size' })
        .regex(/^[a-z0-9_-]+$/, { message: 'username-invalid-characters' }),
      password: z
        .string({ message: 'password-required' })
        .min(6, { message: 'password-invalid-size' })
        .max(255, { message: 'password-invalid-size' }),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    const userId = await createUser(input.username, input.password);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  });
