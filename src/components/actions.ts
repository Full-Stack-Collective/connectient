'use server';
import supabase from '@/db/supabase';
import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type LoginFormData from '@/types/LoginFormData';
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed to create appointment:', error.message);
    } else {
      console.error('Failed to create appointment:', error);
    }
    throw new Error('Failed to create appointment');
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
