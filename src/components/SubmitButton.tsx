'use client';

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
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      {pending ? waiting : children}
    </Button>
  );
}
