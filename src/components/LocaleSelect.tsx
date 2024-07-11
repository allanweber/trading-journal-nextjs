'use client';

import { useSetLocale } from '@/hooks/useSetLocale';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('locale');
  const { locale, setLocale } = useSetLocale();

  const handleChange = (nextLocale: string) => {
    setLocale(nextLocale);
  };

  return (
    <ToggleGroup
      type="single"
      size="sm"
      onValueChange={handleChange}
      value={locale}
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
