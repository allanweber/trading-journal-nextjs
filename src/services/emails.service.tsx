import env from '@/env';
import { sendEmail } from '@/lib/email';
import { AccountActivation } from '@/mails/AccountActivation';
import ContactConfirmation from '@/mails/ContactConfirmation';
import ResetPassword from '@/mails/ResetPassword';
import { getTranslations } from 'next-intl/server';

export async function sendActivationEmail(email: string, token: string) {
  const t = await getTranslations('emails');
  const subject = t('activate-account');
  await sendEmail(email, subject, <AccountActivation token={token} />);
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const t = await getTranslations('emails');
  const subject = t('reset-password-subject');
  await sendEmail(email, subject, <ResetPassword token={token} />);
}

export async function sendContactEmail(
  email: string,
  name: string,
  message: string
) {
  const t = await getTranslations('emails');
  const subject = t('contact-subject');
  await sendEmail(
    email,
    subject,
    <ContactConfirmation name={name} email={email} message={message} />,
    env.BCC_EMAIL
  );
}
