import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import {
  ADMIN_PORTAL_LAYOUT_MENU,
  ADMIN_PORTAL_FOOTER_MENU,
} from '@/lib/constants';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const getAuthenticationMenuLink = () => {
    // If user not authenticated, display only Login menu
    if (!session) {
      return [
        {
          name: 'Login',
          link: '/admin/unauthenticated',
        },
      ];
    }

    // If user is already authenticated, display Logout & Dashboard menu
    return [
      {
        name: 'Dashboard',
        link: '/admin/dashboard',
      },
      {
        name: 'Logout',
        link: '/admin',
      },
    ];
  };

  return (
    <div className="m-auto max-w-7xl w-full min-h-screen py-2 px-4 flex flex-col">
      <Header
        menuList={[...ADMIN_PORTAL_LAYOUT_MENU, ...getAuthenticationMenuLink()]}
        logoLink="/admin"
      />
      {children}
      <Footer menuList={ADMIN_PORTAL_FOOTER_MENU} logoLink="/admin" />
    </div>
  );
};

export default AdminLayout;
