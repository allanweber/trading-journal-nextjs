import { z } from 'zod';

export const generalFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'theme-is-required',
    invalid_type_error: 'theme-is-invalid',
  }),
  language: z.enum(['en', 'pt-Br'], {
    invalid_type_error: 'language-is-invalid',
    required_error: 'language-is-required',
  }),
});

export type GeneralFormValues = z.infer<typeof generalFormSchema>;
