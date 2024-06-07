'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  {
    locale: 'en',
    label: 'english',
  },
  {
    locale: 'pt-Br',
    label: 'portuguese',
  },
];

export default function LocaleSelect() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = locales.find(
    (locale) => locale.locale === pathname.split('/')[1]
  );

  const handleChange = (e: any) => {
    const nextLocale = e.target.value;
    if (!pathname) router.push('/');
    const segments = pathname.split('/');
    segments[1] = nextLocale;
    router.push(segments.join('/'));
  };

  return (
    <select
      value={currentLocale?.locale}
      onChange={handleChange}
      className="border border-gray-300 rounded-md"
    >
      {locales.map((locale) => (
        <option key={locale.locale} value={locale.locale}>
          {t(locale.label)}
        </option>
      ))}
    </select>
  );
}
