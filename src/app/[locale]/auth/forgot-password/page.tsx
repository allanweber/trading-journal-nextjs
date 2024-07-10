import { Button } from '@/components/ui/button';
import { constants } from '@/lib/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function Page() {
  const t = useTranslations('auth');
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('reset-password')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('forgot-password-description')}
        </p>
      </div>
      <ForgotPasswordForm />
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Button variant="outline" asChild>
          <Link href={constants.APP_SIGNIN_PAGE}>{t('login')}</Link>
        </Button>
      </div>
    </>
  );
}
