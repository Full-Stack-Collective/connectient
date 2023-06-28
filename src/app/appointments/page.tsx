import styles from '../styles.module.css'
import test from '@styles/test.module.css'

export default function Appointments() {
  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the appointment request page</h1>
      <p>Please fill the form.</p>
    </main>
  )
}
