'use client';

import { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@styles/appointmentForm.module.css';
import { createAppointmentFormAction } from './actions';
import AppointmentDetailsPopup from './AppointmentDetailsPopup';
import ErrorPopup from './ErrorPopup';
const AppointmentForm = () => {
  const [, startTransition] = useTransition();
  const [createdAppointment, setCreatedAppointment] =
    useState<Appointment | null>(null);
  const [isAppointmentDetailsPopupOpen, setIsAppointmentDetailsPopupOpen] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const defaultValues: Appointment = {
    first_name: '',
    last_name: '',
    mobile_phone: '',
    email: '',
    dob: '',
    requested_date: '',
    requested_time: '',
    appointment_type: '',
    description: '',
    is_emergency: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<Appointment>({
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((createdAppointment) => {
    setCreatedAppointment(createdAppointment);
    setIsPreviewMode(true);
  });

  const handleConfirmAppointment = (createdAppointment: Appointment) => {
    startTransition(() => {
      createAppointmentFormAction(createdAppointment)
        .then((createdAppointment) => {
          console.log('Appointment created:', createdAppointment);
          setIsAppointmentDetailsPopupOpen(true);
          reset(defaultValues);
          setErrorMessage('');
          setIsPreviewMode(false);
        })
        .catch((error) => {
          console.error('Failed to create appointment:', error);
          setErrorMessage(
            'Appointment request not sent, please try again or call the phone number 123-123-1234',
          );
        });
    });
  };
  const handleGoBack = () => {
    setIsPreviewMode(false);
  };

  return (
    <>
      {isPreviewMode ? (
        <>
          <h2>Appointment Preview</h2>
          <p>
            Name: {createdAppointment?.first_name}{' '}
            {createdAppointment?.last_name}
          </p>
          <p>Email: {createdAppointment?.email}</p>
          <p>Phone: {createdAppointment?.mobile_phone}</p>
          <p>
            Requested Appointment Date: {createdAppointment?.requested_date}
          </p>
          <p>
            Requested Appointment Time: {createdAppointment?.requested_time}
          </p>
          <p>
            Requested Appointment Type: {createdAppointment?.appointment_type}
          </p>
          {createdAppointment?.description && (
            <p>Description: {createdAppointment?.description}</p>
          )}
          <p>Emergency: {createdAppointment?.is_emergency}</p>
          <button onClick={handleGoBack}>Go Back </button>

          <button onClick={() => handleConfirmAppointment(createdAppointment!)}>
            Submit
          </button>
        </>
      ) : (
        <>
          <p>Submit the form below to request an appointment.</p>
          <form
            className={styles.apptForm}
            onSubmit={(event) => void onSubmit(event)}
          >
            <div className={styles.apptFormSection}>
              <label
                htmlFor="first_name"
                className={`${styles.inputLabel} ${styles.required}`}
              >
                First name:{''}
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
              <label
                htmlFor="last_name"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="mobile_phone"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="email"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="dob"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="requested_date"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="requested_time"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <label
                htmlFor="appointment_type"
                className={`${styles.inputLabel} ${styles.required}`}
              >
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
              <legend className={`${styles.inputLabel} ${styles.required}`}>
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

      {createdAppointment && isAppointmentDetailsPopupOpen && (
        <AppointmentDetailsPopup
          appointment={createdAppointment}
          isOpen={isAppointmentDetailsPopupOpen}
          onClose={() => setIsAppointmentDetailsPopupOpen(false)}
        />
      )}

      {errorMessage && (
        <ErrorPopup
          isOpen={errorMessage !== ''}
          onClose={() => setErrorMessage('')}
          errorMessage={errorMessage}
        />
      )}
    </>
  );
};

export default AppointmentForm;
