import { Database as DB } from '../../lib/database.types';

declare global {
  type Database = DB;
  type User = DB['public']['Tables']['Users']['Row'];
  type Appointment = DB['public']['Tables']['Appointments']['Insert'];
  type AppointmentType =
    DB['public']['Tables']['Enums']['appointment_type_enum'];
  type Practice = DB['public']['Tables']['Practice']['Row'];
}
