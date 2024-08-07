'use server';

import { validateToken } from '@/lib/recaptcha';
import { unauthenticatedAction } from '@/lib/safe-action';
import { subscribe } from '@/services/newsletter.service';
import { z } from 'zod';

export const subscribeNewsletter = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z
        .string({ message: 'email-required' })
        .email({ message: 'email-invalid' }),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    await subscribe(input.email);
    return { success: true };
  });

export const recaptchaValidation = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      token: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      return await validateToken(input.token);
    } catch (error) {
      return { success: false };
    }
  });
