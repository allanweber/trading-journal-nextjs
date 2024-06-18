'use server';

import db from '@/db';
import { newsletter } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { createServerAction } from 'zsa';

export const subscribeNewsletter = createServerAction()
  .input(
    z.object({
      email: z
        .string({ message: 'Provide your email address' })
        .email({ message: 'Invalid email address' }),
    }),
    {
      type: 'formData',
    }
  )
  .handler(async ({ input }) => {
    try {
      const subscribed = await db.query.newsletter.findFirst({
        where: eq(newsletter.email, input.email),
      });

      if (!subscribed) {
        const result = await db.insert(newsletter).values({
          email: input.email,
        });
      }

      return { success: true };
    } catch (error) {
      console.error('error', error);

      return { success: false };
    }
  });
