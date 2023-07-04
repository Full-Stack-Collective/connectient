import styles from '../styles.module.css'
import test from '@styles/test.module.css'
import LoginForm from '@/components/LoginForm'
import Appointments from '@/components/Appointments'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function Admin() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the Admin page!</h1>
      {!session ? (
        <>
          <p>Please enter your username and password to be granted access.</p>
          <LoginForm />
        </>
      ) : (
        <Appointments />
      )}
    </main>
  )
}
