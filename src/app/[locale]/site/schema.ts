import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z
    .string({ message: 'Provide your email address' })
    .email({ message: 'Invalid email address' }),
});
