type ConfirmationEmailData = {
  first_name: string;
  last_name: string;
  email: string;
  appointment_type: string | null;
  scheduled_date: string | null | undefined;
  scheduled_time: string | null | undefined;
  practice_id: string | null | undefined;
};

export default ConfirmationEmailData;
