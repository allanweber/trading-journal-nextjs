import { buttonVariants } from '@/components/ui/button';
import { constants } from '@/lib/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import HeroCards from './HeroCards';

export default function Hero() {
  const t = useTranslations('site');
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          {t.rich('hero-message', {
            title: (chunks: any) => (
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                {chunks}
              </span>
            ),
            traders: (chunks: any) => (
              <span className="bg-gradient-to-r from-[#1fc0f1] via-[#1fc0f1] to-[#2563EB] text-transparent bg-clip-text">
                {chunks}
              </span>
            ),
            investors: (chunks: any) => (
              <span className="bg-gradient-to-r from-[#1fc0f1] via-[#1fc0f1] to-[#2563EB] text-transparent bg-clip-text">
                {chunks}
              </span>
            ),
          })}
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          {t('hero-description')}
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            rel="noreferrer noopener"
            href={constants.APP_SIGNIN_PAGE}
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: 'default',
            })}`}
          >
            {t('get-started')}
          </Link>
        </div>
      </div>
      <div className="z-10">
        <HeroCards />
      </div>
    </section>
  );
}
