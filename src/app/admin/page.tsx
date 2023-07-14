import styles from '../styles.module.css';
import test from '@styles/test.module.css';
import LoginForm from '@/components/LoginForm';
import AppointmentDashboard from '@/components/AppointmentDashboard';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import AdminLogout from '@/components/AdminLogout';

export default async function Admin() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main className={styles.main}>
      {!session ? (
        <>
          <h1 className={test.text}>Welcome to the Admin page!</h1>
          <p>Please enter your username and password to be granted access.</p>
          <LoginForm />
        </>
      ) : (
        <>
          <AdminLogout />
          <AppointmentDashboard />
        </>
      )}
    </main>
  );
}
