'use server';

import { unsubscribe } from '@/lib/newsletter';
import { unauthenticatedAction } from '@/lib/safe-action';
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
