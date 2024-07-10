import { Icons } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function GoogleSigninButton() {
  const t = useTranslations('auth');

  return (
    <Button asChild variant="outline">
      <Link href="/api/auth/google">
        <Icons.Google className="stroke-white mr-2 h-5 w-5" />
        {t('signin-with-google')}
      </Link>
    </Button>
  );
}
