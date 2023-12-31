'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <h3 className="text-center">{error.message}</h3>
      <Button className="mt-4" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
