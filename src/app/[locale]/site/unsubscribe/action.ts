'use server';

import { unauthenticatedAction } from '@/lib/safe-action';
import { unsubscribe } from '@/services/newsletter-service';
import { z } from 'zod';

export const unsubscribeNewsletter = unauthenticatedAction
  .createServerAction()
  .input(
    z.object({
      email: z.string({ message: 'email-required' }),
    })
  )
  .handler(async ({ input }) => {
    await unsubscribe(input.email);
  });
