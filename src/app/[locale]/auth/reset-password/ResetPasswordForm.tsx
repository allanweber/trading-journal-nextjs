'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useServerAction } from 'zsa-react';
import { resetPassword } from './action';

export default function ResetPasswordForm({ token }: { token: string }) {
  const t = useTranslations();
  const errorT = useTranslations('errors');

  const { executeFormAction, isSuccess, error } =
    useServerAction(resetPassword);

  if (isSuccess) {
    return redirect(`/auth/sign-in`);
  }

  return (
    <form action={executeFormAction} noValidate className="flex flex-col gap-4">
      <input type="hidden" name="token" value={token} />
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
          </>
        </div>
      </div>
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input
          type="password"
          name="password"
          id="password"
          placeholder={t('password')}
          autoComplete="new-password"
        />
        <div className="text-sm text-destructive">
          {error?.fieldErrors?.password &&
            error?.fieldErrors?.password.map((err) => (
              <div key={err}>{errorT(err)}</div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder={t('confirm-password')}
          autoComplete="new-password"
        />
        <div className="text-sm text-destructive">
          {error?.fieldErrors?.confirmPassword &&
            error?.fieldErrors?.confirmPassword.map((err) => (
              <div key={err}>{errorT(err)}</div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80 text-sm text-destructive">
        {error && 'ERROR' === error.code && <div>{errorT(error.name)}</div>}
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <SubmitButton>{t('continue')}</SubmitButton>
      </div>
    </form>
  );
}
