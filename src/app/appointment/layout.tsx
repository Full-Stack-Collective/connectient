import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  PATIENT_PORTAL_LAYOUT_MENU,
  PATIENT_PORTAL_FOOTER_MENU,
} from '@/lib/constants';

const AppointmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto max-w-7xl w-full py-2 px-4">
      <Header menuList={PATIENT_PORTAL_LAYOUT_MENU} logoLink="/" />
      {children}
      <Footer menuList={PATIENT_PORTAL_FOOTER_MENU} logoLink="/" />
    </div>
  );
};

export default AppointmentLayout;
