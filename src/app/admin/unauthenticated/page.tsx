import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import LoginForm from '@/components/LoginForm';

const Unauthenticated = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/admin/dashboard');
  }

  return (
    <main className="flex-1 flex justify-center items-center">
      <LoginForm />
    </main>
  );
};

export default Unauthenticated;
