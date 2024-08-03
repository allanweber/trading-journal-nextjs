'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

type Props = {
  state: 'month' | 'year';
  onChange: (interval: 'month' | 'year') => void;
};

export default function IntervalSwitcher({ state, onChange }: Props) {
  const t = useTranslations('subscription-plans');
  const [interval, setInterval] = useState<'month' | 'year'>(state);

  const handleSwitch = (interval: 'month' | 'year') => {
    setInterval(interval);
    onChange(interval);
  };

  const active =
    'bg-primary text-primary-foreground rounded-full px-4 py-2 font-medium transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring';
  const inactive =
    'rounded-full px-4 py-2 font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-ring';

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-muted rounded-full p-1 flex items-center">
        <button
          onClick={() => handleSwitch('month')}
          className={interval === 'month' ? active : inactive}
        >
          {t('monthly')}
        </button>
        <button
          onClick={() => handleSwitch('year')}
          className={interval === 'year' ? active : inactive}
        >
          {t('annually')}
        </button>
      </div>
    </div>
  );
}
