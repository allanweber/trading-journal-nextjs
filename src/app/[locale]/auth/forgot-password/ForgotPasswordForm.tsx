'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useServerAction } from 'zsa-react';
import { sendLink } from './action';

export default function ForgotPasswordForm() {
  const t = useTranslations();
  const errorT = useTranslations('errors');

  const { executeFormAction, isSuccess, error } = useServerAction(sendLink);

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-2 mx-auto w-80">
        <div className="text-center">{t('forgot-password-email-sent')}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mx-auto w-80">
      <form
        action={executeFormAction}
        noValidate
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2 mx-auto w-80">
          <Input
            name="email"
            id="email"
            type="email"
            placeholder={t('email')}
          />
          <div className="text-sm text-destructive">
            <>
              {error?.fieldErrors?.email &&
                error?.fieldErrors?.email.map((err) => (
                  <div key={err}>{errorT(err)}</div>
                ))}
              {error && 'ERROR' === error.code && <div>{error.message}</div>}
            </>
          </div>
        </div>

        <div className="flex flex-col gap-2 mx-auto w-80">
          <SubmitButton>{t('continue')}</SubmitButton>
        </div>
      </form>
    </div>
  );
}
