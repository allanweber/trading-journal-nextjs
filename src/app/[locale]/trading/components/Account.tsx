import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { constants } from '@/lib/config';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { signOut } from './action';

const navItems = [
  {
    label: 'settings',
    href: `${constants.APP_ROOT_PAGE}/settings/user`,
  },
  {
    label: 'support',
    href: `${constants.APP_ROOT_PAGE}/settings/support`,
  },
];

export default function Account() {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>UR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t('my-account')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item) => (
          <DropdownMenuItem key={item.href}>
            <Link href={item.href}>{t(item.label)}</Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={signOut}>
            <Button
              variant="ghost"
              type="submit"
              size="sm"
              className="justify-start m-0 p-0 font-normal h-5 w-24"
            >
              {t('logout')}
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
