'use server';

import { login } from '@/lib/auth';
import { unauthenticatedAction } from '@/lib/safe-action';
import { z } from 'zod';

export const signin = unauthenticatedAction
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
    await login(input.email, input.password);
    return { success: true };
  });
