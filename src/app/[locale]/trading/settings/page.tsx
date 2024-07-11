import { Separator } from '@/components/ui/separator';
import { getTranslations } from 'next-intl/server';
import { GeneralForm } from './GeneralForm';
import { loadSettings } from './action';

export default async function Page() {
  const t = await getTranslations('appearance');
  const [data, err] = await loadSettings();
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t('title')}</h3>
        <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
      </div>
      <Separator />
      {data && <GeneralForm initialValues={data} />}
      {err && <div className="text-sm text-destructive">{err.message}</div>}
    </div>
  );
}
