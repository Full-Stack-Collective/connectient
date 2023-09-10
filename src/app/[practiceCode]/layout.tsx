export const dynamic = 'force-dynamic'; //remove this when proper fix has been implemented

import Footer from '@/components/Footer';

const AppointmentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen py-2 flex flex-col">
      <div className="px-4 py-2 m-auto max-w-7xl w-full">{children}</div>
      <Footer isUserPage={true} logoLink="/" />
    </div>
  );
};

export default AppointmentLayout;
