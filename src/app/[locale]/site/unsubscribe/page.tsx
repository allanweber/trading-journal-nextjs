import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { unsubscribeNewsletter } from './action';

export default function UnsubscribePage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const t = useTranslations('site.unsubscribe');
  if (!searchParams.email) {
    redirect('/');
  }

  async function unsubscribe(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;

    await unsubscribeNewsletter({
      email,
    });

    redirect('/');
  }

  return (
    <div className="py-24 flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl md:text-3xl">{t('title')}</h1>
      <form action={unsubscribe}>
        <input
          type="text"
          name="email"
          defaultValue={searchParams.email}
          hidden={true}
          readOnly
        />
        <Button variant="outline" size="lg" type="submit">
          {t('button')}
        </Button>
      </form>
    </div>
  );
}
