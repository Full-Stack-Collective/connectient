'use server'

import type AppointmentFormData from '@/types/AppointmentFormData'
import type LoginFormData from '@/types/LoginFormData'

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  )
}

export const appointmentFormAction = (data: AppointmentFormData): void => {
  console.log(
    `Email: ${data.email} | 
      Date of birth: ${data.dob} | 
      Appointment Date: ${data.apptDate} | 
      Appointment Type: ${data.apptType} |
      Optional Description: ${data.optionalDescription} |
      Emergency: ${data.emergency}`,
  )
}
