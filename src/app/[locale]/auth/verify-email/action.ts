'use server';

import { ActionError, unauthenticatedAction } from '@/lib/safe-action';
import {
  sendVerificationEmail,
  verifyEmailCode,
} from '@/services/email-verification.service';
import { z } from 'zod';

export const verify = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      code: z
        .string({ message: 'code-required' })
        .min(6, { message: 'code-invalid-size' })
        .max(6, { message: 'code-invalid-size' }),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    try {
      await verifyEmailCode(input.code);
      return { success: true };
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      console.error(error);
      throw new ActionError('SOMETHING-WRONG', 'Something went wrong');
    }
  });

export const sendAgain = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z
        .string({ message: 'email-required' })
        .regex(/.+@.+/, { message: 'email-invalid' }),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    try {
      await sendVerificationEmail(input.email);
      return { success: true };
    } catch (error) {
      if (error instanceof ActionError) {
        throw error;
      }
      console.error(error);
      throw new ActionError('SOMETHING-WRONG', 'Something went wrong');
    }
  });
