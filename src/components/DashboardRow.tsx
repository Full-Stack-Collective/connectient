'use client';

import { useState } from 'react';
import styles from '@styles/appointmentDashboard.module.css';
import AppointmentDescriptionPopup from '@components/AppointmentDescriptionPopup';

type DashboardRowProps = {
  appointment: Appointment;
};

const DashboardRow = ({ appointment }: DashboardRowProps) => {
  const {
    is_emergency,
    first_name,
    last_name,
    email,
    mobile_phone,
    requested_date,
    is_scheduled,
    scheduled_date,
  } = appointment;

  const [
    isAppointementDescriptionPopupOpen,
    setIsAppointementDescriptionPopupOpen,
  ] = useState(false);

  return (
    <>
      <div
        className={styles.dashboardRow}
        onClick={() => setIsAppointementDescriptionPopupOpen(true)}
      >
        <p className={styles.rowElement}>{is_emergency ? '✔' : '✘'}</p>
        <p className={styles.rowElement}>{first_name}</p>
        <p className={styles.rowElement}>{last_name}</p>
        <p className={styles.rowElement}>{email}</p>
        <p className={styles.rowElement}>{mobile_phone}</p>
        <p className={styles.rowElement}>
          {new Date(requested_date!).toDateString()}
        </p>
        <p className={styles.rowElement}>
          {is_scheduled ? new Date(scheduled_date!).toDateString() : '✘'}
        </p>
      </div>
      {isAppointementDescriptionPopupOpen ? (
        <AppointmentDescriptionPopup
          isOpen={isAppointementDescriptionPopupOpen}
          onClose={() => setIsAppointementDescriptionPopupOpen(false)}
          clickedAppointment={appointment}
        />
      ) : null}
    </>
  );
};

export default DashboardRow;
