import { Button } from '@/components/ui/button';
import { constants } from '@/lib/config';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import ResetPasswordForm from './ResetPasswordForm';
import { validateToken } from './action';

export default async function Page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const t = await getTranslations('auth');

  const [data, err] = await validateToken({ token: searchParams.token });

  if (!searchParams.token || data?.success === false || err) {
    return (
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-sm text-destructive">
          {err?.name ? t(err.name) : t('invalid-token')}
        </h1>
        <Button asChild variant="link">
          <Link href="forgot-password">{t('forgot-password')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {t('reset-password')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('reset-password-description')}
        </p>
      </div>
      <ResetPasswordForm token={searchParams.token} />
      <div className="flex flex-col gap-2 mx-auto w-80">
        <Button variant="outline" asChild>
          <Link href={constants.APP_SIGNIN_PAGE}>{t('login')}</Link>
        </Button>
      </div>
    </>
  );
}
