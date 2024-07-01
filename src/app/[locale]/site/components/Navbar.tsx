'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useState } from 'react';

import { Icons } from '@/components/Icons';
import LocaleSelect from '@/components/LocaleSelect';
import ModeToggle from '@/components/ModeToggle';
import { buttonVariants } from '@/components/ui/button';
import { constants } from '@/lib/config';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export interface RouteProps {
  href: string;
  label: string;
}

export type NavbarProps = {
  routeList: RouteProps[];
  signInLabel: string;
  signUpLabel: string;
};

export default function Navbar({
  routeList,
  signInLabel,
  signUpLabel,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex"
            >
              <Icons.Logo />
              Trading Journal
            </Link>
          </NavigationMenuItem>

          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}
                ></Menu>
                <span className="sr-only">Menu Icon</span>
              </SheetTrigger>

              <SheetContent side={'left'}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    Trading Journal
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link
                    rel="noreferrer noopener"
                    href={constants.APP_SIGNIN_PAGE}
                    className={`w-[130px] ${buttonVariants({
                      variant: 'default',
                    })}`}
                  >
                    {signInLabel}
                  </Link>
                  <Link
                    rel="noreferrer noopener"
                    href={constants.APP_SIGNUP_PAGE}
                    className={`w-[130px] ${buttonVariants({
                      variant: 'default',
                    })}`}
                  >
                    {signUpLabel}
                  </Link>
                  <LocaleSelect />
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: 'ghost',
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              rel="noreferrer noopener"
              href={constants.APP_SIGNIN_PAGE}
              className={`w-[130px] ${buttonVariants({
                variant: 'default',
              })}`}
            >
              {signInLabel}
            </Link>
            <Link
              rel="noreferrer noopener"
              href={constants.APP_SIGNUP_PAGE}
              className={`w-[130px] ${buttonVariants({
                variant: 'default',
              })}`}
            >
              {signUpLabel}
            </Link>
            <LocaleSelect />
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
