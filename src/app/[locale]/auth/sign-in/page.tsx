import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { constants } from '@/lib/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SigninForm from './SigninForm';

export default function Page() {
  const t = useTranslations('auth');
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('signin-tile')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('signin-description')}
        </p>
      </div>
      <SigninForm />
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Button asChild variant="outline">
          <Link href="/api/auth/google">
            <Icons.Google className="stroke-white mr-2 h-5 w-5" />
            {t('signin-with-google')}
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Button asChild variant="link">
          <Link href="forgot-password">{t('forgot-password')}</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Button variant="outline" asChild>
          <Link href={constants.APP_SIGNUP_PAGE}>{t('register')}</Link>
        </Button>
      </div>
    </>
  );
}
