import { useTranslations } from 'next-intl';
import NewsletterForm from './NewsletterForm';

export default function Newsletter() {
  const t = useTranslations('site.newsletter');

  const formProps = {
    inputLabel: t('email'),
    buttonLabel: t('button'),
    waitingMessage: t('waiting'),
    successMessage: t('success'),
  };

  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          {t.rich('title', {
            newsletter: (newsletter) => (
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                {newsletter}
              </span>
            ),
          })}
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          {t('description')}
        </p>

        <NewsletterForm {...formProps} />
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
}
