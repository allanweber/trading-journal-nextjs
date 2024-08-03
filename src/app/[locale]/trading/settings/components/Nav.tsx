'use client';

import { useCurrentPath } from '@/hooks/useCurrentPath';
import { constants } from '@/lib/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const navItems = [
  {
    label: 'appearance',
    href: `${constants.APP_ROOT_PAGE}/settings`,
  },
  {
    label: 'account',
    href: `${constants.APP_ROOT_PAGE}/settings/account`,
  },
  {
    label: 'subscription',
    href: `${constants.APP_ROOT_PAGE}/settings/subscription`,
  },
];

export default function Nav() {
  const { currentPath } = useCurrentPath();
  const t = useTranslations('nav');

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={
            currentPath === item.href ? 'font-semibold text-primary' : ''
          }
          prefetch={false}
        >
          {t(item.label)}
        </Link>
      ))}
    </nav>
  );
}
