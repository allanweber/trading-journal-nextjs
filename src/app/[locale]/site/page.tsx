import { Metadata } from 'next';
import Features from './components/Features';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Pricing from './components/Pricing';
import { ScrollToTop } from './components/ScrollToTop';

export const metadata: Metadata = {
  title: 'Trading Journal website',
  description: 'Trading Journal App website',
};

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Newsletter />
      {/* <FAQ />
      <Footer /> */}
      <ScrollToTop />
    </>
  );
}
