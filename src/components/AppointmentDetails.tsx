import { AppointmentFormData } from '@/types/AppointmentFormData'

interface AppointmentDetailsProps {
  appointment: AppointmentFormData
}

function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <div>
      <h2>Your Appointment Request Details</h2>
      <p>
        Name: {appointment.first_name} {appointment.last_name}
      </p>
      <p>Email: {appointment.email}</p>
      <p>Phone: {appointment.mobile_phone}</p>
      <p>Requested Appointment Date: {appointment.requested_date}</p>
      <p>Requested Appointment Time: {appointment.requested_time}</p>
      <p>Requested Appointment Type: {appointment.appointment_type}</p>
      {appointment.description && <p>Description: {appointment.description}</p>}
      <p>Emergency: {appointment.is_emergency}</p>
    </div>
  )
}

export default AppointmentDetails
