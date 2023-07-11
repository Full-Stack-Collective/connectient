import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import RealtimeAppointmentDashboard from '@components/RealtimeAppointmentDashboard';
import Appointment from '@/types/Appointment';
import styles from '@styles/appointmentDashboard.module.css';

const AppointmentDashboard = async () => {
  const supabase = createServerComponentClient({ cookies });

  const { data: appointments }: { data: Appointment[] | null } = await supabase
    .from('Appointments')
    .select();

  // Can we generate from the database?
  const columnTitles: string[] = [
    'First Name',
    'Last Name',
    'Email',
    'Contact',
    'Requested Date',
    'Scheduled Date',
  ];

  return (
    <div className={styles.dashboardWrapper}>
      <section className={styles.dashboard}>
        {/* Render the table headings */}
        <div className={styles.headerRow}>
          {columnTitles.map((columnTitle) => (
            <h2 key={columnTitle} className={styles.columnTitle}>
              {columnTitle}
            </h2>
          ))}
        </div>
        <RealtimeAppointmentDashboard appointments={appointments} />
      </section>
    </div>
  );
};

export default AppointmentDashboard;
