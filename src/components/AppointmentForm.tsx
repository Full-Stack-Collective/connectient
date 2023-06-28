'use client'

import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { appointmentFormAction } from './actions'
import type AppointmentFormData from '@/types/AppointmentFormData'
import styles from '@styles/appointmentForm.module.css'

const AppointmentForm = () => {
  const [, startTransition] = useTransition()

  const defaultValues = {
    firstName: '',
    lastName: '',
    phoneNum: '',
    email: '',
    dob: '',
    apptDate: '',
    apptType: '',
    optionalDescription: '',
    emergency: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<AppointmentFormData>({
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    startTransition(() => {
      appointmentFormAction(data)
    })
  })

  return (
    <form
      className={styles.apptForm}
      onSubmit={(event) => void onSubmit(event)}
    >
      <div className={styles.apptFormSection}>
        <label htmlFor="firstName" className={styles.inputLabel}>
          First name:{' '}
        </label>
        <input
          type="text"
          id="firstName"
          className={styles.input}
          placeholder="Enter first name"
          {...register('firstName', {
            required: 'First name is required.',
          })}
        />
        <p className={styles.error}>
          {errors.firstName && errors.firstName.message}
        </p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="lastName" className={styles.inputLabel}>
          Last name:{' '}
        </label>
        <input
          type="text"
          id="lastName"
          className={styles.input}
          placeholder="Enter last name"
          {...register('lastName', {
            required: 'Last name is required.',
          })}
        />
        <p className={styles.error}>
          {errors.lastName && errors.lastName.message}
        </p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="phoneNum" className={styles.inputLabel}>
          Phone contact:{' '}
        </label>
        <input
          type="tel"
          id="phoneNum"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          className={styles.input}
          placeholder="Ex: 123-456-7890"
          {...register('phoneNum', {
            required: 'Phone contact is required.',
          })}
        />
        <p className={styles.error}>
          {errors.phoneNum && errors.phoneNum.message}
        </p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email:{' '}
        </label>
        <input
          type="text"
          id="email"
          className={styles.input}
          placeholder="Enter email"
          {...register('email', {
            required: 'Email is required.',
            validate: {
              maxLength: (v) =>
                v.length <= 50 || 'The email should have at most 50 characters',
              matchPattern: (v) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                'Email address must be a valid address',
            },
          })}
        />
        <p className={styles.error}>{errors.email && errors.email.message}</p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="dob" className={styles.inputLabel}>
          Date of birth:{' '}
        </label>
        <input
          type="date"
          id="dob"
          className={styles.input}
          {...register('dob', {
            required: 'Date of birth is required.',
          })}
        />
        <p className={styles.error}>{errors.dob && errors.dob.message}</p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="apptDate" className={styles.inputLabel}>
          Appointment date:{' '}
        </label>
        <input
          type="date"
          id="apptDate"
          className={styles.input}
          {...register('apptDate', {
            required: 'Appointment date is required.',
          })}
        />
        <p className={styles.error}>
          {errors.apptDate && errors.apptDate.message}
        </p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="apptType" className={styles.inputLabel}>
          Appointment type:{' '}
        </label>
        <select
          id="apptType"
          className={styles.input}
          {...register('apptType', {
            required: 'Appointment type is required.',
          })}
        >
          <option value="examination">Examination</option>
          <option value="cleaning">Cleaning/Polishing</option>
          <option value="extraction">Extraction</option>
          <option value="fillings">Fillings</option>
          <option value="other">Something else</option>
        </select>
        <p className={styles.error}>
          {errors.apptType && errors.apptType.message}
        </p>
      </div>
      <div className={styles.apptFormSection}>
        <label htmlFor="optionalDescription" className={styles.inputLabel}>
          If something else:{' '}
        </label>
        <textarea
          id="optionalDescription"
          className={styles.input}
          placeholder="Enter description here"
          {...register('optionalDescription')}
        />
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.inputLabel}>Is this an emergency?</legend>
        <div className={styles.input}>
          <input
            type="radio"
            id="emergencyChoice1"
            value="yes"
            {...register('emergency', {
              required: 'This field is required.',
            })}
          />
          <label htmlFor="emergencyChoice1" className={styles.inputLabel}>
            Yes
          </label>
          <input
            type="radio"
            id="emergencyChoice2"
            value="no"
            {...register('emergency', {
              required: 'This field is required.',
            })}
          />
          <label htmlFor="emergencyChoice2" className={styles.inputLabel}>
            No
          </label>
        </div>
        <p className={styles.error}>
          {errors.emergency && errors.emergency.message}
        </p>
      </fieldset>
      <div className={styles.apptFormSection}>
        <button
          className={
            !isDirty || (isDirty && !isValid)
              ? styles.submitButtonDisabled
              : styles.submitButton
          }
          type="submit"
          disabled={!isDirty || (isDirty && !isValid)}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default AppointmentForm
