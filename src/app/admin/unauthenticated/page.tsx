import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import test from '@styles/test.module.css';
import LoginForm from '@/components/LoginForm';
import styles from '../../styles.module.css';

const Unauthenticated = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/admin');
  }

  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the Admin page!</h1>
      <p>Please enter your username and password to be granted access.</p>
      <LoginForm />
    </main>
  );
};

export default Unauthenticated;
