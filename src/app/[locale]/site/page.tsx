import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return <Button>{t('hello')}</Button>;
}
