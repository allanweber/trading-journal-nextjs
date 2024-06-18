'use client';

import { Input } from '@/components/ui/input';
import { useFormStatus } from 'react-dom';
import { subscribeNewsletter } from '../actions';

import { Button } from '@/components/ui/button';

import { useServerAction } from 'zsa-react';

type Props = {
  inputLabel: string;
  buttonLabel: string;
  waitingMessage: string;
  successMessage: string;
};

function SubmitButton({ label, waiting }: { label: string; waiting: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? waiting : label}
    </Button>
  );
}

export default function NewsletterForm({
  inputLabel,
  buttonLabel,
  waitingMessage,
  successMessage,
}: Props) {
  const { executeFormAction, isSuccess, error } =
    useServerAction(subscribeNewsletter);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center">
        <h3 className="text-3xl">{successMessage}</h3>
      </div>
    );
  }

  return (
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
        <div className="text-sm text-red-500">{error?.fieldErrors?.email}</div>
      </div>
      <SubmitButton label={buttonLabel} waiting={waitingMessage} />
    </form>
  );
}
