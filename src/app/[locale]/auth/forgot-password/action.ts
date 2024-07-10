'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import { changePasswordRequest } from '@/services/user.service';
import { z } from 'zod';

export const sendLink = unauthenticatedAction
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
    await changePasswordRequest(input.email);
    return { success: true };
  });
