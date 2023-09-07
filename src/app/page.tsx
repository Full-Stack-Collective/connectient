import { cookies } from 'next/headers';
import {
  Session,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { ADMIN_PORTAL_FEATURES, getNavigationLinks } from '@/lib/constants';

const Home = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const getHeroTitle = () => (
    <>
      An{' '}
      <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
        Effortless Appointment Request System
      </span>{' '}
      for Better Healthcare
    </>
  );

  const heroSubtitle =
    'Empower healthcare providers and administrators with a powerful tool to efficiently manage and oversee all requested appointments in one centralized location. Simplify your appointment management process and enhance productivity with our comprehensive and intuitive dashboard.';

  const heroCalloutBtn = {
    text: 'Get Started',
    link: '/admin/',
  };

  // Future use for the 'Get Started' button can be to direct users to the register page

  return (
    <div className="min-h-screen py-2 flex flex-col">
      <Header
        menuList={[...getNavigationLinks(session as Session)]}
        logoLink="/"
        session={session}
      />
      <div className="px-4 py-2 m-auto max-w-7xl w-full">
        <Hero
          title={getHeroTitle()}
          subtitle={heroSubtitle}
          calloutBtn={heroCalloutBtn}
        />
        <Features features={ADMIN_PORTAL_FEATURES} />
      </div>
      <Footer
        menuList={[...getNavigationLinks(session as Session)]}
        logoLink="/"
        isUserPage={false}
      />
    </div>
  );
};

export default Home;
