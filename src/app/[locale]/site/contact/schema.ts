import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string({ message: 'name-required' }).min(3, { message: 'min-3' }),
  email: z
    .string({ message: 'email-required' })
    .email({ message: 'email-invalid' }),
  message: z
    .string({ message: 'message-required' })
    .min(10, { message: 'min-10' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
