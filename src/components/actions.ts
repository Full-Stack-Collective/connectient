'use server'

export type LoginFormData = {
  userName: string
  userPassword: string
}

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  )
}
