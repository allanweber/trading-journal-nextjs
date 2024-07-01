'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useLocale, useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useServerAction } from 'zsa-react';
import { signup } from './action';

export default function SignupForm() {
  const locale = useLocale();
  const t = useTranslations();
  const errorT = useTranslations('errors');

  const { executeFormAction, isSuccess, error } = useServerAction(signup);

  if (isSuccess) {
    return redirect(`/${locale}/trading`);
  }

  return (
    <form action={executeFormAction} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input name="username" id="username" placeholder={t('email')} />
        <div className="text-sm text-red-500">
          <>
            {error?.fieldErrors?.username &&
              error?.fieldErrors?.username.map((err) => (
                <div key={err}>{errorT(err)}</div>
              ))}
            {error && 'ERROR' === error.code && <div>{errorT(error.name)}</div>}
          </>
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input
          type="password"
          name="password"
          id="password"
          placeholder={t('password')}
        />
        <div className="text-sm text-red-500">
          {error?.fieldErrors?.password &&
            error?.fieldErrors?.password.map((err) => (
              <div key={err}>{errorT(err)}</div>
            ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <SubmitButton>{t('continue')}</SubmitButton>
      </div>
    </form>
  );
}
