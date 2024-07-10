'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useServerAction } from 'zsa-react';
import { signup } from './action';

export default function SignupForm() {
  const t = useTranslations();
  const errorT = useTranslations('errors');

  const { executeFormAction, isSuccess, error } = useServerAction(signup);

  if (isSuccess) {
    return redirect('/auth/verify-email');
  }

  return (
    <form action={executeFormAction} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input
          name="email"
          id="email"
          type="email"
          placeholder={t('email')}
          autoComplete="email"
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
        <Input
          type="password"
          name="password"
          id="password"
          placeholder={t('password')}
          autoComplete="current-password"
        />
        <div className="text-sm text-destructive">
          {error?.fieldErrors?.password &&
            error?.fieldErrors?.password.map((err) => (
              <div key={err}>{errorT(err)}</div>
            ))}
          {error && 'ERROR' === error.code && <div>{error.message}</div>}
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <SubmitButton>{t('continue')}</SubmitButton>
      </div>
    </form>
  );
}
