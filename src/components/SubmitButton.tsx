'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { Button } from './ui/button';

export default function SubmitButton({
  children,
  waiting,
  disabled = false,
}: {
  children: React.ReactNode;
  waiting?: React.ReactNode;
  disabled?: boolean;
}) {
  const t = useTranslations();
  const { pending } = useFormStatus();

  const wait = waiting ?? t('please-wait');

  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? wait : children}
    </Button>
  );
}
