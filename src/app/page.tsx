import styles from './styles.module.css'
import test from '@styles/test.module.css'
import AppointmentForm from '@components/AppointmentForm'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={test.text}>Let&apos;s get started</h1>
      <p>Submit the form below to request an appointment.</p>
      <AppointmentForm />
    </main>
  )
}
