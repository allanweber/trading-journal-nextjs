import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Navbar, { NavbarProps, RouteProps } from './components/Navbar';

export const metadata: Metadata = {
  title: 'Trading Journal website',
  description: 'Trading Journal website',
};

const routeList: RouteProps[] = [
  {
    href: '#features',
    label: 'features',
  },
  {
    href: '#pricing',
    label: 'pricing',
  },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations('site');

  const navbarProps: NavbarProps = {
    routeList: routeList.map(({ label, href }) => ({
      label: t(label),
      href,
    })),
    signInLabel: t('sign-in'),
    signUpLabel: t('sign-up'),
  };

  return (
    <>
      <Navbar {...navbarProps} />
      {children}
    </>
  );
}
