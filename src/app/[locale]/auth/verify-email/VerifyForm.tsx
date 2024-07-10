'use client';

import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useServerAction } from 'zsa-react';
import { sendAgain, verify } from './action';

export default function VerifyForm() {
  const t = useTranslations();
  const errorT = useTranslations('errors');
  const [showCode, setShowCode] = useState(true);

  const {
    executeFormAction: executeVerify,
    isSuccess: verifySuccess,
    error: verifyError,
  } = useServerAction(verify);

  const {
    executeFormAction: executeSendAgain,
    isSuccess: sendAgainSuccess,
    error: sendAgainError,
  } = useServerAction(sendAgain);

  if (verifySuccess) {
    return redirect(`/trading`);
  }

  if (sendAgainSuccess) {
    return redirect('/auth/verify-email');
  }

  return (
    <>
      {showCode ? (
        <form action={executeVerify} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 mx-auto w-80 items-center">
            <InputOTP maxLength={6} name="code">
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="text-sm text-destructive">
              {verifyError?.fieldErrors?.code &&
                verifyError?.fieldErrors?.code.map((err: string) => (
                  <div key={err}>{errorT(err)}</div>
                ))}
              {verifyError && 'ERROR' === verifyError.code && (
                <div>{verifyError.message}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 mx-auto w-80">
            <SubmitButton>{t('continue')}</SubmitButton>
          </div>

          <div className="flex flex-col gap-2 mx-auto w-80">
            <Button
              type="button"
              variant="link"
              onClick={() => setShowCode(false)}
            >
              Send again
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-2 mx-auto w-80">
          <form
            action={executeSendAgain}
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
                  {sendAgainError?.fieldErrors?.email &&
                    sendAgainError?.fieldErrors?.email.map((err) => (
                      <div key={err}>{errorT(err)}</div>
                    ))}
                  {sendAgainError && 'ERROR' === sendAgainError.code && (
                    <div>{sendAgainError.message}</div>
                  )}
                </>
              </div>
            </div>

            <div className="flex flex-col gap-2 mx-auto w-80">
              <SubmitButton>{t('continue')}</SubmitButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
