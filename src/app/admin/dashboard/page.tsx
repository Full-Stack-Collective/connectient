import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import AppointmentDashboard from '@/components/AppointmentDashboard';

const Dashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user not authemticated, redirect to login
  if (!session) {
    redirect('/admin/unauthenticated');
  }

  return (
    <main className="flex-1 flex justify-center items-center">
      <AppointmentDashboard />
    </main>
  );
};

export default Dashboard;
