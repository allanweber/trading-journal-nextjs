'use client';

import { useCurrentPath } from '@/hooks/useCurrentPath';
import { cn } from '@/lib/utils';
import { Package2Icon, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { navItems } from './SideNav';

export default function MobileNav() {
  const { currentPath } = useCurrentPath();

  return (
    <nav className="fixed inset-y-8 grid gap-6 text-lg font-medium">
      <nav className="flex flex-col gap-4">
        <Link
          href="/trading"
          className="group flex h-10 w-50 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          prefetch={false}
        >
          <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
          Acme Inc
        </Link>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'group flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
              currentPath === item.href
                ? 'text-foreground '
                : 'text-muted-foreground'
            )}
            prefetch={false}
          >
            {React.cloneElement(item.icon, {
              className: 'h-5 w-5 transition-all group-hover:scale-110',
            })}
            {item.label}
          </Link>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col gap-4">
        <Link
          href="/trading/settings"
          className={cn(
            'group flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
            '/trading/settings' === currentPath
              ? 'text-foreground'
              : 'text-muted-foreground'
          )}
          prefetch={false}
        >
          <SettingsIcon className="h-5 w-5 transition-all group-hover:scale-110" />
          Settings
        </Link>
      </nav>
    </nav>
  );
}
