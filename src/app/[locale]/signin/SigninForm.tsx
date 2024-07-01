'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { useServerAction } from 'zsa-react';
import { signin } from './action';

export default function SigninForm() {
  const locale = useLocale();

  const { executeFormAction, isSuccess, error } = useServerAction(signin);

  if (isSuccess) {
    return redirect(`/${locale}/trading`);
  }

  return (
    <form action={executeFormAction} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input name="username" id="username" placeholder="Username" />
        <div className="text-sm text-red-500">
          <>
            {error?.fieldErrors?.username &&
              error?.fieldErrors?.username.map((err) => (
                <div key={err}>{err}</div>
              ))}
            {error && 'ERROR' === error.code && <div>{error.message}</div>}
          </>
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        <div className="text-sm text-red-500">
          {error?.fieldErrors?.password &&
            error?.fieldErrors?.password.map((err) => (
              <div key={err}>{err}</div>
            ))}
          {error && 'ERROR' === error.code && <div>{error.message}</div>}
        </div>
      </div>

      <div className="flex flex-col gap-2 mx-auto w-80">
        <SubmitButton>Continue</SubmitButton>
      </div>
    </form>
  );
}
