'use server';

import { lucia } from '@/lib/auth';
import { unauthenticatedAction } from '@/lib/safe-action';
import { createUser } from '@/services/user.service';
import { cookies } from 'next/headers';
import { z } from 'zod';

export const signup = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z
        .string({ message: 'email-required' })
        .regex(/.+@.+/, { message: 'email-invalid' }),
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
    const userId = await createUser(input.email, input.password);

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return { success: true };
  });
