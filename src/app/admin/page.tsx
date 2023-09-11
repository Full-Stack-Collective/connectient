export const dynamic = 'force-dynamic'; //remove this when proper fix has been implemented

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const Login = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/admin/dashboard');
  } else redirect('/admin/login');
};

export default Login;
