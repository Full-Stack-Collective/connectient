'use server';
import supabase from '@/db/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type LoginFormData from '@/types/LoginFormData';
import { transporter, mailOptions } from '@/config/nodemailer';
import { generateEmailContent } from '@/config/emailContent';
import { PostgrestError } from '@supabase/supabase-js';

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  );
};

export const createAppointmentFormAction = async (
  appointmentData: Appointment,
): Promise<Appointment> => {
  try {
    const { error }: { error: PostgrestError | null } = await supabase
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
    });
    return appointmentData;
  } catch (error) {
    throw new Error('Failed to send request email.');
  }
};

export const updateAppointment = async (
  appointmentId: string,
  isScheduled: boolean,
) => {
  const supabase = createServerActionClient<Database>({ cookies });
  try {
    const { error }: { error: PostgrestError | null } = await supabase
      .from('Appointments')
      .update({ is_scheduled: isScheduled })
      .eq('id', appointmentId);

    if (error) {
      throw new Error('Failed to update appointment schedule.');
    }
  } catch (error) {
    console.error(error);
  }
};
