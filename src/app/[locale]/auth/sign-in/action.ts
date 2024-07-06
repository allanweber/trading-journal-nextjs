'use server';

import { login } from '@/lib/auth';
import { ActionError, unauthenticatedAction } from '@/lib/safe-action';
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
    try {
      await login(input.email, input.password);
      return { success: true };
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      console.error(error);
      throw new ActionError('SOMETHING-WRONG', 'Something went wrong');
    }
  });
