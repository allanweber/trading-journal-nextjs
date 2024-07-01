import LocaleSelect from '@/components/LocaleSelect';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';
import Link from 'next/link';
import SigninForm from './SigninForm';

export default function Page() {
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <span className="flex flex-row gap-3 absolute right-4 top-4 md:right-10 md:top-8">
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: 'ghost' }))}
          >
            Register
          </Link>
          <LocaleSelect />
        </span>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium gap-2">
            <Package className="h-6 w-6 transition-all group-hover:scale-110" />
            <span>Acme Inc</span>
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Some quote about the product or service goes here. Some quote
                about the product or service goes here.
              </p>
            </blockquote>
          </div>
        </div>
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Enter with your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email and password below to access your account
              </p>
            </div>
            <SigninForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
