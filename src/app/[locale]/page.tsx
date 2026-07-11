import { setRequestLocale } from 'next-intl/server';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Stats } from '@/components/sections/stats';
import { Products } from '@/components/sections/products';
import { Geography } from '@/components/sections/geography';
import { Process } from '@/components/sections/process';
import { Certificates } from '@/components/sections/certificates';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Stats />
        <Products />
        <Geography />
        <Process />
        <Certificates />
        <Gallery />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
