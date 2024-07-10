'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import { setSession } from '@/lib/session';
import { createPasswordUser } from '@/services/user.service';
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
    const userId = await createPasswordUser(input.email, input.password);
    await setSession(userId);
    return { success: true };
  });
