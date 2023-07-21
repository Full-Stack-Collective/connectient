import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import styles from '../styles.module.css';
import AppointmentDashboard from '@/components/AppointmentDashboard';
import AdminLogout from '@/components/AdminLogout';

export default async function Admin() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/unauthenticated');
  }

  return (
    <main className={styles.main}>
      <AdminLogout />
      <AppointmentDashboard />
    </main>
  );
}
