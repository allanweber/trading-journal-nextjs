'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Icons } from './Icons';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

const locales = [
  {
    locale: 'en',
    label: 'english',
    Icon: <Icons.UK />,
  },
  {
    locale: 'pt-Br',
    label: 'portuguese',
    Icon: <Icons.Brazil />,
  },
];

export default function LocaleSelect() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locales.find(
    (locale) => locale.locale === pathname.split('/')[1]
  );

  const handleChange = (nextLocale: string) => {
    if (!pathname) router.push('/');
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  return (
    <ToggleGroup
      type="single"
      size="sm"
      onValueChange={handleChange}
      value={currentLocale?.locale}
    >
      {locales.map((locale) => (
        <ToggleGroupItem
          key={locale.locale}
          value={locale.locale}
          aria-label={locale.label}
        >
          {locale.Icon}
          <span className="sr-only">{t(locale.label)}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
