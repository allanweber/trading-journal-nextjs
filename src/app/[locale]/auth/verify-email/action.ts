'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
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
    await verifyEmailCode(input.code);
    return { success: true };
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
    await sendVerificationEmail(input.email);
    return { success: true };
  });
