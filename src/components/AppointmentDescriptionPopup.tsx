'use client';

import styles from '@styles/appointmentDescriptionPopup.module.css';
import Appointment from '@/types/Appointment';

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
  return (
    <div className={`${styles.popup} ${isOpen ? styles.opened : ''}`}>
      <div className={styles.popupContainer}>
        {JSON.stringify(clickedAppointment)}
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
