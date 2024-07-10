'use client';

import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { useFormField } from './ui/form';

export default function FormErrorMessage() {
  const t = useTranslations('errors');

  const { formState } = useFormContext();
  const { name } = useFormField();

  const error = formState.errors?.[name];

  if (!error) return null;

  return (
    <div className="text-sm font-semibold text-destructive">
      {t(error.message)}
    </div>
  );
}
