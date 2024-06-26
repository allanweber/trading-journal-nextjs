'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { constants } from '@/lib/config';
import { cn } from '@/lib/utils';
import { HomeIcon, Package, SettingsIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export const navItems = [
  {
    icon: <HomeIcon />,
    label: 'Dashboard',
    href: `${constants.APP_ROOT_PAGE}/dashboard`,
  },
];

export default function SideNav() {
  const { currentPath } = useCurrentPath();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-50 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Link
            href={`${constants.APP_ROOT_PAGE}`}
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            prefetch={false}
          >
            <Package className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {navItems.map((item) => (
            <Tooltip key={item.label}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                    currentPath === item.href ? 'bg-accent scale-110' : ''
                  )}
                  prefetch={false}
                >
                  {React.cloneElement(item.icon, {
                    className: 'h-5 w-5 transition-all group-hover:scale-110',
                  })}
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`${constants.APP_ROOT_PAGE}/settings`}
                className={cn(
                  'group flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
                  `${constants.APP_ROOT_PAGE}/settings` === currentPath
                    ? 'bg-accent scale-110'
                    : ''
                )}
                prefetch={false}
              >
                <SettingsIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
