import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const Appointments = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: appointments } = await supabase.from('Appointments').select();

  return (
    <div>
      <h2>Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Requested Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.map((appointment: Appointment) => {
            const {
              id,
              first_name,
              last_name,
              email,
              mobile_phone,
              requested_date,
            } = appointment;

            return (
              <tr key={id}>
                <td>{first_name}</td>
                <td>{last_name}</td>
                <td>{email}</td>
                <td>{mobile_phone}</td>
                <td>{requested_date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
