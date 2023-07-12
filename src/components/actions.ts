'use server';
import supabase from '@/db/supabase';
import type { AppointmentFormData } from '@/types/AppointmentFormData';
import type LoginFormData from '@/types/LoginFormData';
import { PostgrestError } from '@supabase/supabase-js';

export const loginFormAction = (data: LoginFormData): void => {
  console.log(
    `User Name: ${data.userName} | User Password: ${data.userPassword}`,
  );
};

export const createAppointmentFormAction = async (
  appointmentData: AppointmentFormData,
): Promise<AppointmentFormData> => {
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
