'use client';

import SubmitButton from '@/components/SubmitButton';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useServerAction } from 'zsa-react';
import { recaptchaValidation, subscribeNewsletter } from '../actions';

type Props = {
  inputLabel: string;
  buttonLabel: string;
  waitingMessage: string;
  successMessage: string;
};

export default function NewsletterForm({
  inputLabel,
  buttonLabel,
  waitingMessage,
  successMessage,
}: Props) {
  const t = useTranslations('validation');
  const errorT = useTranslations('errors');
  const [captcha, setCaptcha] = useState<boolean>(false);

  const { executeFormAction, isSuccess, error } =
    useServerAction(subscribeNewsletter);

  const { execute: validate } = useServerAction(recaptchaValidation);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-3xl">{successMessage}</h3>
      </div>
    );
  }

  if (error && 'ERROR' === error.code) {
    return (
      <div className="flex flex-col items-center text-xl text-destructive">
        {'Error' === error.name ? errorT('error') : errorT(error.name)}
      </div>
    );
  }

  return (
    <article className="flex flex-col items-center">
      <form
        className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
        action={executeFormAction}
        noValidate
      >
        <div className="flex flex-col gap-2 mx-auto w-80">
          <Input
            placeholder={inputLabel}
            className="bg-muted/50 dark:bg-muted/80 invalid:border-red-500 invalid:text-red-600"
            aria-label="email"
            type="email"
            name="email"
            aria-invalid={error?.fieldErrors?.email !== undefined}
          />
          <div className="text-sm text-destructive">
            {error?.fieldErrors?.email &&
              error?.fieldErrors?.email.map((err) => t(err))}
          </div>
        </div>
        <SubmitButton waiting={waitingMessage} disabled={!captcha}>
          {buttonLabel}
        </SubmitButton>
      </form>
      <ReCAPTCHA
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        onChange={async (token) => {
          const [data, err] = await validate({ token: token! });
          if (err || !data?.success) {
            setCaptcha(false);
          } else {
            setCaptcha(true);
          }
        }}
      />
    </article>
  );
}
