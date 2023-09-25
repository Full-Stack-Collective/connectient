'use client';

import { useState, useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { compareDesc } from 'date-fns';

import PracticeEmailData from '@/types/PracticeEmailData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { columns } from './columns';
import { DataTable } from './data-table';

export const DataTabs = ({
  appointments,
  practiceInfo,
}: {
  appointments: Appointment[] | null;
  practiceInfo: PracticeEmailData | null;
}) => {
  const newAppointments = useRef<Appointment[]>([]);
  const [newAppointmentsList, setNewAppointmentList] = useState<Appointment[]>(
    [],
  );
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { toast } = useToast();

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
        (payload: RealtimePostgresChangesPayload<Appointment>) => {
          router.refresh();
          if (payload.eventType === 'INSERT') {
            newAppointments.current.push(payload.new);
            setNewAppointmentList(newAppointments.current);
            toast({
              title: 'Mission Alert - Incoming Request!',
              description:
                'Your mission, should you choose to accept it: manage a new appointment request. Good luck, admin!',
            });
          }
        },
      )
      .subscribe();

    return () => {
      // eslint-disable-next-line
      supabase.removeChannel(channel);
    };
  }, [supabase, router, toast]);

  // Remove the appointment from the list of new appointments if the admin clicks on the appointment
  // Once admin clicks a new appointment to see, it means the appointment has been seen
  // and we can remove it from the list of new appointments
  const handleAppointmentClick = (selectedAppointmentId: string) => {
    newAppointments.current = newAppointments.current.filter(
      (appointment) => appointment.id !== selectedAppointmentId,
    );
    setNewAppointmentList(newAppointments.current);
  };

  // Filter appointment data into different categories
  const emergencyAppointments = appointments?.filter(
    (appointment) =>
      appointment?.is_emergency === true &&
      appointment?.is_scheduled === false &&
      appointment?.is_cancelled === false,
  );

  const normalAppointments = appointments?.filter(
    (appointment) =>
      appointment?.is_emergency === false &&
      appointment?.is_scheduled === false &&
      appointment?.is_cancelled === false,
  );

  // Filter all the scheduled appointments and sort them by the last time they were modified
  const scheduledAppointments = appointments?.filter(
    (appointment) =>
      appointment?.is_scheduled === true && appointment?.is_cancelled === false,
  );
  scheduledAppointments?.sort((a: Appointment, b: Appointment): number =>
    compareDesc(new Date(a.modified_at ?? 0), new Date(b.modified_at ?? 0)),
  );

  // Filter all the cancelled appointments and sort them by the last time they were modified
  const cancelledAppointments = appointments?.filter(
    (appointment) => appointment?.is_cancelled === true,
  );
  cancelledAppointments?.sort((a: Appointment, b: Appointment): number =>
    compareDesc(new Date(a.modified_at ?? 0), new Date(b.modified_at ?? 0)),
  );

  return (
    <Tabs defaultValue="all" className="border p-2 rounded-md bg-background">
      <TabsList className="flex flex-col h-full gap-2 py-2 sm:inline-flex sm:flex-row sm:p-1">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="emergency">Emergency</TabsTrigger>
        <TabsTrigger value="normal">Normal</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
      </TabsList>
      <TabsContent value="emergency">
        <p className="text-sm p-4 text-muted-foreground">
          Emergency appointments section requires your immediate attention to
          schedule the appointments.
        </p>
        <DataTable
          columns={columns}
          data={emergencyAppointments!}
          practiceInfo={practiceInfo}
          handleAppointmentClick={handleAppointmentClick}
          newAppointments={newAppointmentsList}
        />
      </TabsContent>
      <TabsContent value="normal">
        <p className="text-sm p-4 text-muted-foreground">
          Normal appointments section has all the appointments that are not an
          emergency, have not been scheduled yet, and have not been cancelled.
        </p>
        <DataTable
          columns={columns}
          data={normalAppointments!}
          practiceInfo={practiceInfo}
          handleAppointmentClick={handleAppointmentClick}
          newAppointments={newAppointmentsList}
        />
      </TabsContent>
      <TabsContent value="scheduled">
        <p className="text-sm p-4 text-muted-foreground">
          Scheduled appointments section has all the appointments that have been
          scheduled recently.
        </p>
        <DataTable
          columns={columns}
          data={scheduledAppointments!}
          practiceInfo={practiceInfo}
          handleAppointmentClick={handleAppointmentClick}
          newAppointments={newAppointmentsList}
        />
      </TabsContent>
      <TabsContent value="cancelled">
        <p className="text-sm p-4 text-muted-foreground">
          Cancelled appointments section has all the appointments that have been
          cancelled recently.
        </p>
        <DataTable
          columns={columns}
          data={cancelledAppointments!}
          practiceInfo={practiceInfo}
          handleAppointmentClick={handleAppointmentClick}
          newAppointments={newAppointmentsList}
        />
      </TabsContent>
      <TabsContent value="all">
        <p className="text-sm p-4 text-muted-foreground">
          &apos;All&apos; appointments section has all the appointments
          regardless of the status.
        </p>
        <DataTable
          columns={columns}
          data={appointments!}
          practiceInfo={practiceInfo}
          handleAppointmentClick={handleAppointmentClick}
          newAppointments={newAppointmentsList}
        />
      </TabsContent>
    </Tabs>
  );
};
