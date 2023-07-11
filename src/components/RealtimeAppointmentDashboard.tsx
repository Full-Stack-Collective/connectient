'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@styles/appointmentDashboard.module.css';
import Appointment from '@/types/Appointment';

const DashboardRow = ({ appointment }: { appointment: Appointment }) => {
  const {
    first_name,
    last_name,
    email,
    mobile_phone,
    requested_date,
    is_scheduled,
    scheduled_date,
  } = appointment;

  return (
    <div className={styles.dashboardRow}>
      <p className={styles.rowElement}>{first_name}</p>
      <p className={styles.rowElement}>{last_name}</p>
      <p className={styles.rowElement}>{email}</p>
      <p className={styles.rowElement}>{mobile_phone}</p>
      <p className={styles.rowElement}>
        {new Date(requested_date).toDateString()}
      </p>
      <p className={styles.rowElement}>
        {is_scheduled
          ? new Date(scheduled_date).toDateString()
          : 'Not Scheduled'}
      </p>
    </div>
  );
};

const RealtimeAppointmentDashboard = ({
  appointments,
}: {
  appointments: Appointment[] | null;
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel('realtime appointment dashboard')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Appointments',
        },
        () => {
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      // eslint-disable-next-line
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <>
      {/* Render the table rows */}
      {appointments?.map((appointment) => (
        <DashboardRow key={appointment.id} appointment={appointment} />
      ))}
    </>
  );
};

export default RealtimeAppointmentDashboard;
