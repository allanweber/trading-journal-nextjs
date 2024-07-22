import { Resend } from 'resend';

import env from '@/env';
import { ReactNode } from 'react';
import { ActionError } from './safe-action';

const resend = new Resend(env.EMAIL_SERVER_PASSWORD);

export async function sendEmail(
  email: string,
  subject: string,
  body: ReactNode,
  bcc?: string
) {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: email,
    subject,
    react: <>{body}</>,
    bcc,
  });

  if (error) {
    throw new ActionError('EMAIL_SEND_ERROR', 'Failed to send email: ' + error);
  }
}
