'use server';

import { ActionError, unauthenticatedAction } from '@/lib/safe-action';
import {
  changePassword,
  validateChangePasswordToken,
} from '@/services/user.service';
import { z } from 'zod';

export const validateToken = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      token: z.string({ message: 'token-required' }),
    })
  )
  .handler(async ({ input }) => {
    try {
      await validateChangePasswordToken(input.token);
      return { success: true };
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      console.error(error);
      throw new ActionError('SOMETHING-WRONG', 'Something went wrong');
    }
  });

export const resetPassword = unauthenticatedAction
  .createServerAction()
  .input(
    z
      .object({
        email: z
          .string({ message: 'email-required' })
          .regex(/.+@.+/, { message: 'email-invalid' }),
        password: z
          .string({ message: 'password-required' })
          .min(6, { message: 'password-invalid-size' })
          .max(255, { message: 'password-invalid-size' }),
        confirmPassword: z
          .string({ message: 'password-required' })
          .min(6, { message: 'password-invalid-size' })
          .max(255, { message: 'password-invalid-size' }),
        token: z.string({ message: 'token-required' }),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: 'password-mismatch',
        path: ['confirmPassword', 'password'],
      }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    try {
      await changePassword(input.token, input.email, input.password);
      return { success: true };
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      console.error(error);
      throw new ActionError('SOMETHING-WRONG', 'Something went wrong');
    }
  });
