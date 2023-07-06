'use server'

import type { AppointmentFormData } from '@/types/AppointmentFormData'
import type LoginFormData from '@/types/LoginFormData'

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  )
}

export const appointmentFormAction = (data: AppointmentFormData): void => {
  console.log(
    `First Name: ${data.first_name} |
      Last Name: ${data.last_name} |
      Phone Number: ${data.mobile_phone} |
      Email: ${data.email} |
      Date of birth: ${data.dob} | 
      Appointment Date: ${data.requested_date} | 
      Appointment Time: ${data.requested_time} |
      Appointment Type: ${data.appointment_type} |
      Optional Description: ${data.description} |
      Emergency: ${data.is_emergency},`,
  )
}
