'use client'

import { useTransition, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AppointmentFormData, Appointment } from '@/types/AppointmentFormData'
import styles from '@styles/appointmentForm.module.css'
import { createAppointment } from '@/utils/api'
import AppointmentDetails from './AppointmentDetails'
import Link from 'next/link'

const AppointmentForm = () => {
  const [, startTransition] = useTransition()
  const [createdAppointment, setCreatedAppointment] =
    useState<Appointment | null>(null)

  const defaultValues: AppointmentFormData = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    email: '',
    dob: '',
    requested_date: '',
    requested_time: '',
    appointment_type: '',
    description: '',
    is_emergency: '',
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<AppointmentFormData>({
    defaultValues,
    mode: 'onChange',
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(() => {
      createAppointment(data)
        .then((createdAppointment) => {
          console.log('Appointment created:', createdAppointment)
          setCreatedAppointment(createdAppointment)
        })
        .catch((error) => {
          console.error('Failed to create appointment:', error)
          console.log(
            'Appointment request not sent, please try again or call the phone number 123-123-1234',
          )
        })
    })
  })
  const handleRequestAnotherAppointment = () => {
    setCreatedAppointment(null)
    reset()
  }
  return (
    <>
      {createdAppointment ? (
        <div>
          <AppointmentDetails appointment={createdAppointment} />
          <button
            className={styles.link}
            onClick={handleRequestAnotherAppointment}
          >
            Request Another Appointment
          </button>
          <br />
          <br />
          <Link href="/" className={styles.link}>
            Go Home
          </Link>
        </div>
      ) : (
        <>
          <p>Submit the form below to request an appointment.</p>
          <form
            className={styles.apptForm}
            onSubmit={(event) => void onSubmit(event)}
          >
            <div className={styles.apptFormSection}>
              <label htmlFor="first_name" className={styles.inputLabel}>
                First name:{' '}
              </label>
              <input
                type="text"
                id="first_name"
                className={styles.input}
                placeholder="Enter first name"
                {...register('first_name', {
                  required: 'First name is required.',
                  minLength: {
                    value: 2,
                    message: 'First name should be at least 2 chars long.',
                  },
                })}
              />
              <p className={styles.error}>
                {errors.first_name && errors.first_name.message}
              </p>
            </div>
            <div className={styles.apptFormSection}>
              <label htmlFor="last_name" className={styles.inputLabel}>
                Last name:{' '}
              </label>
              <input
                type="text"
                id="last_name"
                className={styles.input}
                placeholder="Enter last name"
                {...register('last_name', {
                  required: 'Last name is required.',
                  minLength: {
                    value: 2,
                    message: 'Last name should be at least 2 chars long.',
                  },
                })}
              />
              <p className={styles.error}>
                {errors.last_name && errors.last_name.message}
              </p>
            </div>
            <div className={styles.apptFormSection}>
              <label htmlFor="mobile_phone" className={styles.inputLabel}>
                Phone contact:{' '}
              </label>
              <input
                type="tel"
                id="mobile_phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                className={styles.input}
                placeholder="Ex: 123-456-7890"
                {...register('mobile_phone', {
                  required: 'Phone contact is required.',
                })}
              />
              <p className={styles.error}>
                {errors.mobile_phone && errors.mobile_phone.message}
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
                      v.length <= 50 ||
                      'The email should have at most 50 characters',
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      'Email address must be a valid address',
                  },
                })}
              />
              <p className={styles.error}>
                {errors.email && errors.email.message}
              </p>
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
              <label htmlFor="requested_date" className={styles.inputLabel}>
                Appointment date:{' '}
              </label>
              <input
                type="date"
                id="requested_date"
                className={styles.input}
                {...register('requested_date', {
                  required: 'Appointment date is required.',
                })}
              />
              <p className={styles.error}>
                {errors.requested_date && errors.requested_date.message}
              </p>
            </div>
            <div className={styles.apptFormSection}>
              <label htmlFor="requested_time" className={styles.inputLabel}>
                Appointment Time Preference:{' '}
              </label>
              <select
                id="requested_time"
                className={styles.input}
                {...register('requested_time', {
                  required: 'Appointment time preference is required.',
                })}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="flexible">Flexible</option>
              </select>
              <p className={styles.error}>
                {errors.requested_time && errors.requested_time.message}
              </p>
            </div>
            <div className={styles.apptFormSection}>
              <label htmlFor="appointment_type" className={styles.inputLabel}>
                Appointment type:{' '}
              </label>
              <select
                id="appointment_type"
                className={styles.input}
                {...register('appointment_type', {
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
                {errors.appointment_type && errors.appointment_type.message}
              </p>
            </div>
            <div className={styles.apptFormSection}>
              <label htmlFor="description" className={styles.inputLabel}>
                If something else:{' '}
              </label>
              <textarea
                id="description"
                className={styles.input}
                placeholder="Enter description here"
                {...register('description')}
              />
            </div>
            <fieldset className={styles.fieldset}>
              <legend className={styles.inputLabel}>
                Is this an emergency?
              </legend>
              <div className={styles.input}>
                <input
                  type="radio"
                  id="emergencyChoice1"
                  value="yes"
                  {...register('is_emergency', {
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
                  {...register('is_emergency', {
                    required: 'This field is required.',
                  })}
                />
                <label htmlFor="emergencyChoice2" className={styles.inputLabel}>
                  No
                </label>
              </div>
              <p className={styles.error}>
                {errors.is_emergency && errors.is_emergency.message}
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
        </>
      )}
    </>
  )
}

export default AppointmentForm
