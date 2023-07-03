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
    `First Name: ${data.firstName} |
      Last Name: ${data.lastName} |
      Phone Number: ${data.phoneNum} |
      Email: ${data.email} | 
      Date of birth: ${data.dob} | 
      Appointment Date: ${data.apptDate} | 
      Appointment Time: ${data.apptTime} |
      Appointment Type: ${data.apptType} |
      Optional Description: ${data.optionalDescription} |
      Emergency: ${data.emergency}`,
  )
}
