'use server';

import { parseWithZod } from '@conform-to/zod';
import { newsletterSchema } from './schema';

export async function subscribeNewsletter(
  prevState: unknown,
  formData: FormData
) {
  //sleep for 5 seconds
  await new Promise((r) => setTimeout(r, 5000));

  console.log('formData', formData);

  const submission = parseWithZod(formData, {
    schema: newsletterSchema,
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  submission.payload = { email: formData.get('email') as string };
  return submission.reply({ resetForm: true });
}
