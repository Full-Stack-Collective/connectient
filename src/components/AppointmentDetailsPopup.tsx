'use client';

import { Popup } from './Popup';
type AppointmentDetailsPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
};

const AppointmentDetailsPopup = ({
  isOpen,
  onClose,
  appointment,
}: AppointmentDetailsPopupProps) => {
  const {
    first_name,
    last_name,
    email,
    mobile_phone,
    requested_date,
    requested_time,
    is_emergency,
    description,
    appointment_type,
  } = appointment;

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2>Your appointment request was sent</h2>
      <p>
        Name: {first_name} {last_name}
      </p>
      <p>Email: {email}</p>
      <p>Phone: {mobile_phone}</p>
      <p>Requested Appointment Date: {requested_date}</p>
      <p>Requested Appointment Time: {requested_time}</p>
      <p>Requested Appointment Type: {appointment_type}</p>
      {description && <p>Description: {description}</p>}
      <p>Emergency: {is_emergency}</p>
    </Popup>
  );
};

export default AppointmentDetailsPopup;
