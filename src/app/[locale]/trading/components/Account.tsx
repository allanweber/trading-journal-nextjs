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
import { getAuthenticatedUser } from '@/lib/auth';
import { constants } from '@/lib/config';
import { getTranslations } from 'next-intl/server';
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

export default async function Account() {
  const t = await getTranslations();
  const user = await getAuthenticatedUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={user.pictureUrl} alt={user.displayName} />
            <AvatarFallback>UR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user.displayName || t('my-account')}
        </DropdownMenuLabel>
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
