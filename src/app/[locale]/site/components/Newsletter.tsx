import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export default function Newsletter() {
  const t = useTranslations('site.newsletter');
  async function create() {
    'use server';
    console.log('create');
  }
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

        <form
          className="flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2"
          action={create}
        >
          <Input
            placeholder={t('email')}
            className="bg-muted/50 dark:bg-muted/80 "
            aria-label="email"
          />
          <Button>{t('button')}</Button>
        </form>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
}
