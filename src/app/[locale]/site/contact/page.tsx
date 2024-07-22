import { useTranslations } from 'next-intl';
import ContactForm from './ContactForm';

export default function Page() {
  const t = useTranslations('site.contact');

  return (
    <div className="w-full max-w-md mx-auto py-24 p-4">
      <h1 className="text-xl md:text-xxl">{t('title')}</h1>
      <p className="text-muted-foreground mb-4">{t('subtitle')}</p>
      <ContactForm />
    </div>
  );
}
