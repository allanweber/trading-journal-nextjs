'use server';

import { subscribe } from '@/lib/newsletter';
import { validateToken } from '@/lib/recaptcha';
import { unauthenticatedAction } from '@/lib/safe-action';
import { z } from 'zod';
import { createServerAction } from 'zsa';

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

export const recaptchaValidation = createServerAction()
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
