import React from 'react'
import { AppointmentFormData } from '@/types/AppointmentFormData'

interface AppointmentDetailsProps {
  appointment: AppointmentFormData
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  return (
    <div>
      <h2>Your Appointment request details</h2>
      <p>
        Name: {appointment.first_name} {appointment.last_name}
      </p>
      <p>Email: {appointment.email}</p>
      <p>Phone: {appointment.mobile_phone}</p>

      <p>Requested appointment date: {appointment.requested_date}</p>
      <p>Requested appointment time: {appointment.requested_time}</p>
      <p>Requested appointment type: {appointment.appointment_type}</p>
      {appointment.description ? (
        <p>Description: {appointment.description}</p>
      ) : null}
      <p>Emergency: {appointment.is_emergency}</p>
    </div>
  )
}

export default AppointmentDetails
