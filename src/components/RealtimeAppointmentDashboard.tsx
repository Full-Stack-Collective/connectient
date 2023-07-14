'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardRow from '@components/DashboardRow';

type RealtimeAppointmentDashboardProps = {
  appointments: Appointment[] | null;
};

const RealtimeAppointmentDashboard = ({
  appointments,
}: RealtimeAppointmentDashboardProps) => {
  const supabase = createClientComponentClient<Database>();
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
