import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import UserProfileForm from './UserProfileForm';
import { loadProfile } from './action';

export default async function Page() {
  const t = await getTranslations('account');
  const [data, err] = await loadProfile();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <Separator />
      {data && <UserProfileForm initialValues={data} />}
      {err && <div className="text-sm text-destructive">{err.message}</div>}
    </div>
  );
}
