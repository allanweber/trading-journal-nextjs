'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useCurrentPath } from '@/hooks/useCurrentPath';
import { HomeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function PageBreadcrumb() {
  const t = useTranslations('nav');
  const { pathSegments } = useCurrentPath();

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="flex items-center gap-1"
                >
                  {index === 0 && <HomeIcon className="w-4 h-4" />}
                  <span>{t(segment)}</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
