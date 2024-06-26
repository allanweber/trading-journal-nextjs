import PageBreadcrumb from '@/components/PageBreadcrumb';
import Search from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { PanelLeftIcon } from 'lucide-react';
import Account from './Account';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeftIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <MobileNav />
        </SheetContent>
      </Sheet>
      <PageBreadcrumb />
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search />
      </div>
      <Account />
    </header>
  );
}
