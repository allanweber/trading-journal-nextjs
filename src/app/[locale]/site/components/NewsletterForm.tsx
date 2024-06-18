'use client';

import { Input } from '@/components/ui/input';
import { useFormState, useFormStatus } from 'react-dom';
import { subscribeNewsletter } from '../actions';

import { Button } from '@/components/ui/button';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { newsletterSchema } from '../schema';

type Props = {
  inputLabel: string;
  buttonLabel: string;
  waitingMessage: string;
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
}: Props) {
  const [lastResult, action] = useFormState(subscribeNewsletter, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newsletterSchema });
    },

    shouldValidate: 'onSubmit',
    shouldRevalidate: 'onInput',
  });

  console.log('fields', lastResult);

  return (
    <form
      className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
    >
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Input
          placeholder={inputLabel}
          className="bg-muted/50 dark:bg-muted/80 invalid:border-red-500 invalid:text-red-600"
          aria-label="email"
          type="email"
          key={fields.email.key}
          name={fields.email.name}
          defaultValue={fields.email.initialValue}
          aria-invalid={fields.email.errors !== undefined}
        />
        <div className="text-sm text-red-500">{fields.email.errors}</div>
      </div>
      <SubmitButton label={buttonLabel} waiting={waitingMessage} />
    </form>
  );
}
