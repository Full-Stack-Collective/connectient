'use server';
import supabase from '@/db/supabase';
import type LoginFormData from '@/types/LoginFormData';
import { transporter, mailOptions } from '@/config/nodemailer';
import { generateEmailContent } from '@/config/emailContent';

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  );
};

export const createAppointmentFormAction = async (
  appointmentData: Appointment,
): Promise<Appointment> => {
  try {
    const { error } = await supabase
      .from('Appointments')
      .insert([appointmentData]);
    if (error || !appointmentData) {
      throw new Error('Failed to create appointment');
    }
    return appointmentData;
    // Handle successful form submission ( display success message, or maybe navigate to confirmation page ?)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to create appointment:', error.message);
      // Handle specific error (e.g., display error message, show error notification)
    } else {
      console.error('Failed to create appointment:', error);
      // Handle other types of errors
    }
    throw new Error('Failed to create appointment');
  }
};

export const emailHandler = async (appointmentData: Appointment) => {
  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(appointmentData),
      subject: `Appointment request for ${appointmentData.first_name} ${appointmentData.last_name}`,
    });
    return appointmentData;
  } catch (error) {
    throw new Error('Failed to send confirmation email.');
  }
};
