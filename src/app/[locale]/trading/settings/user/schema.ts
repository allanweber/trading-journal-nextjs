import { z } from 'zod';

export const profileFormSchema = z.object({
  displayName: z
    .string({ message: 'display-name-required' })
    .min(1, { message: 'display-name-required' })
    .max(100),
  firstName: z.string().max(100, { message: 'max-100' }).optional(),
  lastName: z.string().max(100, { message: 'max-100' }).optional(),
  bio: z.string().max(256, { message: 'max-256' }).optional(),
});
