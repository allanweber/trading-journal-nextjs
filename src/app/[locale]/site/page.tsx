import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import Features from './components/Features';
import Hero from './components/Hero';
import Navbar, { NavbarProps, RouteProps } from './components/Navbar';
import Newsletter from './components/Newsletter';
import Pricing from './components/Pricing';
import { ScrollToTop } from './components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Trading Journal website',
  description: 'Trading Journal App website',
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

export default function Page() {
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
      <Hero />
      <Features />
      <Pricing />
      <Newsletter />
      <ScrollToTop />
    </>
  );
}
