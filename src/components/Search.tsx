'use client';

import { Input } from '@/components/ui/input';
import { constants } from '@/lib/config';
import { SearchIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Search() {
  const t = useTranslations('search');
  const router = useRouter();
  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const search = (e.target as HTMLInputElement).value;
      router.push(`${constants.APP_ROOT_PAGE}/search?q=${search}`);
    }
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={t('search')}
        className="w-full rounded-lg pl-8 bg-background md:w-[200px] lg:w-[300px] xl:w-[400px]"
        onKeyDown={handleSearch}
      />
    </div>
  );
}
