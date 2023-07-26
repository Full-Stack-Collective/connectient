import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { PATIENT_PORTAL_LAYOUT_MENU } from '@/lib/constants';

const AppointmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto max-w-7xl w-full py-2 px-4">
      <Header menuList={PATIENT_PORTAL_LAYOUT_MENU} />
      {children}
      <Footer />
    </div>
  );
};

export default AppointmentLayout;
