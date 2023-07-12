'use client';

import { useState, useTransition } from 'react';
import { updateAppointment } from './actions';
import styles from '@styles/appointmentDescriptionPopup.module.css';

type AppointmentDescriptionPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  clickedAppointment: Appointment;
};

const AppointmentDescriptionPopup = ({
  isOpen,
  onClose,
  clickedAppointment,
}: AppointmentDescriptionPopupProps) => {
  const {
    id,
    first_name,
    last_name,
    dob,
    email,
    mobile_phone,
    requested_date,
    requested_time,
    is_emergency,
    description,
    appointment_type,
    is_scheduled,
    scheduled_date,
    scheduled_by,
    is_cancelled,
  } = clickedAppointment;

  const [isChecked, setIsChecked] = useState(is_scheduled);
  const [, startTransition] = useTransition();

  const handleConfirmScheduleChange = () => {
    setIsChecked((prevValue) => {
      startTransition(() => updateAppointment(id!, !prevValue));
      return !prevValue;
    });
  };

  return (
    <div className={`${styles.popup} ${isOpen ? styles.opened : ''}`}>
      <div className={styles.popupContainer}>
        <p>Name: {`${first_name} ${last_name}`}</p>
        <p>Date of Birth: {new Date(dob!).toDateString()}</p>
        <p>Email: {email}</p>
        <p>Contact Number: {mobile_phone}</p>
        <p>Is it an Emergency? : {is_emergency ? '✔' : '✘'}</p>
        <p>Appointment Type: {appointment_type}</p>
        <p>Description: {description ?? 'NA'}</p>
        <p>Requested Date: {new Date(requested_date!).toDateString()}</p>
        <p>Requested Time: {requested_time}</p>
        <p>Has appointment been scheduled? : {is_scheduled ? '✔' : '✘'}</p>
        <p>
          Scheduled Date:{' '}
          {is_scheduled ? new Date(scheduled_date!).toDateString() : 'NA'}
        </p>
        <p>Who scheduled the appointment? : {scheduled_by ?? 'NA'}</p>
        <p>Has appointment been cancelled? : {is_cancelled ? '✔' : '✘'}</p>
        <hr />
        <label>
          Confirm if you have called the patient and scheduled the appointment?
          <input
            type="checkbox"
            checked={isChecked!}
            onChange={handleConfirmScheduleChange}
          />
        </label>
        <button
          className={styles.closeButton}
          aria-label="Close Popup"
          onClick={onClose}
        >
          ✘
        </button>
      </div>
    </div>
  );
};

export default AppointmentDescriptionPopup;
