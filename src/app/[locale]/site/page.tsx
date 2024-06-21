import { Metadata } from 'next';
import Features from './components/Features';
import Hero from './components/Hero';
import Newsletter from './components/Newsletter';
import Pricing from './components/Pricing';
import { ScrollToTop } from './components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Trading Journal',
  description: 'Trading Journal application for traders and investors.',
};

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Newsletter />
      <ScrollToTop />
    </>
  );
}
