import styles from '../styles.module.css'
import test from '@styles/test.module.css'
import LoginForm from '@/components/LoginForm'

export default function Admin() {
  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the Admin page!</h1>
      <p>Please enter your username and password to be granted access.</p>
      <LoginForm />
    </main>
  )
}
