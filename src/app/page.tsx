import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import {
  PATIENT_PORTAL_LAYOUT_MENU,
  PATIENT_PORTAL_FOOTER_MENU,
  PATIENT_PORTAL_FEATURES,
} from '@/lib/constants';

const Home = () => {
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
    'The ultimate solution for simplifying and streamlining the process of scheduling healthcare appointments. Say goodbye to lengthy phone calls and endless waiting times, and say hello to effortless appointment management.';

  const heroCalloutBtn = {
    text: 'Request Appointment',
    link: '/appointment',
  };

  return (
    <div className="min-h-screen py-2 flex flex-col">
      <Header menuList={PATIENT_PORTAL_LAYOUT_MENU} logoLink="/" />
      <div className="px-4 py-2 m-auto max-w-7xl w-full">
        <Hero
          title={getHeroTitle()}
          subtitle={heroSubtitle}
          calloutBtn={heroCalloutBtn}
        />
        <Features features={PATIENT_PORTAL_FEATURES} />
      </div>
      <Footer
        menuList={PATIENT_PORTAL_FOOTER_MENU}
        logoLink="/"
        isUserPage={false}
      />
    </div>
  );
};

export default Home;
