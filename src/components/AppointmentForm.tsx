'use client'

import { useForm } from 'react-hook-form'
import type AppointmentFormData from '@/types/AppointmentFormData'
import styles from '@styles/appointmentForm.module.css'

const AppointmentForm = () => {
  const defaultValues = {
    email: '',
    dob: new Date(),
    apptDate: new Date(),
    apptType: '',
    optionalDescription: '',
    emergency: false,
  }

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<AppointmentFormData>({
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <form
      className={styles.apptForm}
      onSubmit={(event) => void onSubmit(event)}
    >
      <div className={styles.apptFormSection}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email:{' '}
        </label>
        <input
          type="text"
          id="email"
          className={styles.input}
          placeholder="Enter email"
        />
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="dob" className={styles.inputLabel}>
          Date of birth:{' '}
        </label>
        <input type="date" id="dob" className={styles.input} />
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="apptDate" className={styles.inputLabel}>
          Appointment date:{' '}
        </label>
        <input type="date" id="apptDate" className={styles.input} />
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="apptType" className={styles.inputLabel}>
          Appointment type:{' '}
        </label>
        <select id="apptType" className={styles.input}>
          <option value="" disabled hidden>
            Select one
          </option>
          <option value="examination">Examination</option>
          <option value="cleaning">Cleaning/Polishing</option>
          <option value="extraction">Extraction</option>
          <option value="fillings">Fillings</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="optionalDescription" className={styles.inputLabel}>
          If something else:{' '}
        </label>
        <textarea
          id="optionalDescription"
          className={styles.input}
          placeholder="Enter description here"
        />
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.inputLabel}>Is this an emergency?</legend>
        <div className={styles.input}>
          <input type="radio" id="emergencyChoice1" name="emergency" />
          <label htmlFor="emergencyChoice1" className={styles.inputLabel}>
            Yes
          </label>
          <input type="radio" id="emergencyChoice2" name="emergency" />
          <label htmlFor="emergencyChoice2" className={styles.inputLabel}>
            No
          </label>
        </div>
      </fieldset>
      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  )
}

export default AppointmentForm
