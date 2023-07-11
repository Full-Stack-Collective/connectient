type Appointment = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  requested_date: string;
  is_emergency: boolean;
  description: string;
  appointment_type: string;
  is_scheduled: boolean;
  scheduled_date: string;
  created_by: string;
  scheduled_by: string;
  is_cancelled: boolean;
  requested_time: string;
  dob: string;
};

export default Appointment;
