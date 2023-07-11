import AppointmentForm from '@/components/AppointmentForm'
import styles from '../styles.module.css'
import test from '@styles/test.module.css'

export default function Appointment() {
  return (
    <main className={styles.main}>
      <h1 className={test.text}>Welcome to the appointment request page</h1>
      <AppointmentForm />
    </main>
  )
}
