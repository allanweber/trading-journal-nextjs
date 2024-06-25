import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export function useCurrentPath() {
  const pathname = usePathname();
  const locale = useLocale();

  return useMemo(() => {
    const currentPath = pathname.replace(`/${locale}`, '');
    const pathSegments = currentPath.split('/').filter(Boolean);

    return { currentPath, pathSegments };
  }, [locale, pathname]);
}
