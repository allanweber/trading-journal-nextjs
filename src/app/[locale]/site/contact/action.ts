'use server';

import { validateToken } from '@/lib/recaptcha';
import { unauthenticatedAction } from '@/lib/safe-action';
import { sendContactEmail } from '@/services/emails.service';
import { z } from 'zod';
import { contactFormSchema } from './schema';

export const sendMessage = unauthenticatedAction
  .createServerAction()
  .input(contactFormSchema)
  .output(z.object({ success: z.boolean() }))
  .handler(async ({ input }) => {
    await sendContactEmail(input.email, input.name, input.message);
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
