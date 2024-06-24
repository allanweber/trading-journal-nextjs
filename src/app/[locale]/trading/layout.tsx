import Header from './components/Header';
import SideNav from './components/SideNav';

export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SideNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-12">
        <Header />
        <main className="p-4 sm:py-0">{children}</main>
      </div>
    </div>
  );
}
