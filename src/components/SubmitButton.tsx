'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton({
  children,
  waiting,
  isPending = false,
  disabled = false,
}: {
  children: React.ReactNode;
  waiting?: React.ReactNode;
  isPending?: boolean;
  disabled?: boolean;
}) {
  const t = useTranslations();
  let { pending } = useFormStatus();
  pending = pending || isPending;

  const wait = waiting ?? t('please-wait');

  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? wait : children}
    </Button>
  );
}
