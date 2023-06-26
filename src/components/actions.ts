'use server'

import type LoginFormData from '@/types/LoginFormData'

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  )
}
