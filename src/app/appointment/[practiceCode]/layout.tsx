export const dynamic = 'force-dynamic'; //remove this when proper fix has been implemented

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  PATIENT_PORTAL_LAYOUT_MENU,
  PATIENT_PORTAL_FOOTER_MENU,
} from '@/lib/constants';

const AppointmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen py-2 flex flex-col">
      <Header menuList={PATIENT_PORTAL_LAYOUT_MENU} logoLink="/" />
      <div className="px-4 py-2 m-auto max-w-7xl w-full">{children}</div>
      <Footer isUserPage={true} logoLink="/" />
    </div>
  );
};

export default AppointmentLayout;
