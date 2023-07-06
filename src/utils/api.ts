import supabase from '@/db/supabase'
import { Appointment } from '@/types/AppointmentFormData'

export const createAppointment = async (
  appointmentData: Appointment,
): Promise<Appointment> => {
  try {
    const { error }: { data: Appointment | null; error: unknown } =
      await supabase.from('Appointments').insert([appointmentData])
    if (error || !appointmentData) {
      throw new Error('Failed to create appointment api')
    }

    return appointmentData
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        'Failed to create appointment api catch : ' + error.message,
      )
    } else {
      throw new Error('Failed to create appointment api else')
    }
  }
}
