export const dynamic = 'force-dynamic'; //remove this when proper fix has been implemented

import { cookies } from 'next/headers';
import {
  Session,
  createServerComponentClient,
} from '@supabase/auth-helpers-nextjs';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import { getNavigationLinks } from '@/lib/constants';

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="min-h-screen py-2 flex flex-col">
      <Header
        menuList={[...getNavigationLinks(session as Session)]}
        logoLink="/"
        session={session}
      />
      <div className="px-4 py-2 m-auto max-w-7xl w-full">{children}</div>
      <Footer
        menuList={[...getNavigationLinks(session as Session)]}
        logoLink="/admin"
        isUserPage={true}
      />
    </div>
  );
};

export default AdminLayout;
