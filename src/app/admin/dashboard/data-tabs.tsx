'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { compareDesc } from 'date-fns';

import type PracticeEmailData from '@/types/PracticeEmailData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { columns } from './columns';
import { DataTable } from './data-table';

// Get all the new appointments i.e. where modified_at is null
const getAllNewAppointments = (appointments: Appointment[]): Appointment[] =>
  appointments.filter(
    (appointment) => Boolean(appointment.modified_at) === false,
  );

type DataTabsProps = {
  appointments: Appointment[] | null;
  practiceInfo: PracticeEmailData | null;
};

export const DataTabs = ({ appointments, practiceInfo }: DataTabsProps) => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const { toast } = useToast();

  // States & Refs
  const newAppointments = useRef<Appointment[]>([]);
  const [newEmergencyAppointmentsList, setNewEmergencyAppointmentsList] =
    useState<Appointment[]>([]);
  const [newNormalAppointmentsList, setNewNormalAppointmentsList] = useState<
    Appointment[]
  >([]);

  // Conditions to check the type of appointment
  const isEmergency = useCallback(
    (appointment: Appointment) =>
      appointment?.is_emergency === true &&
      appointment?.is_scheduled === false &&
      appointment?.is_cancelled === false,
    [],
  );

  const isNormal = useCallback(
    (appointment: Appointment) =>
      appointment?.is_emergency === false &&
      appointment?.is_scheduled === false &&
      appointment?.is_cancelled === false,
    [],
  );

  const isScheduled = useCallback(
    (appointment: Appointment) =>
      appointment?.is_scheduled === true && appointment?.is_cancelled === false,
    [],
  );

  const isCancelled = useCallback(
    (appointment: Appointment) => appointment?.is_cancelled === true,
    [],
  );

  // Check for new appointments everytime page loads or appointments change
  useEffect(() => {
    newAppointments.current = getAllNewAppointments(appointments!);
    setNewEmergencyAppointmentsList(
      newAppointments.current.filter(isEmergency),
    );
    setNewNormalAppointmentsList(newAppointments.current.filter(isNormal));
  }, [appointments, isEmergency, isNormal]);

  // If there are any new appointments when page loads, trigger the toast
  useEffect(() => {
    if (newAppointments.current.length > 0) {
      toast({
        title: 'New Requests Spotlight!',
        description: `Attention, Commander! You've got ${newAppointments.current.length} new appointment requests. Ready to accept the mission?`,
      });
    }
  }, [toast, isEmergency, isNormal]);

  // Look for realtime updates in the DB
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
          // If there is any new insert, update the new appointments list and trigger a toast to notify admin
          if (payload.eventType === 'INSERT') {
            newAppointments.current.push(payload.new);
            setNewEmergencyAppointmentsList(
              newAppointments.current.filter(isEmergency),
            );
            setNewNormalAppointmentsList(
              newAppointments.current.filter(isNormal),
            );
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
  }, [supabase, router, isEmergency, isNormal, toast]);

  // Remove the appointment from the list of new appointments if the admin clicks on the appointment
  // Once admin clicks a new appointment to see, it means the appointment has been seen
  // and we can remove it from the list of new appointments
  const handleAppointmentClick = (selectedAppointmentId: string) => {
    newAppointments.current = newAppointments.current.filter(
      (appointment) => appointment.id !== selectedAppointmentId,
    );
    setNewEmergencyAppointmentsList(
      newAppointments.current.filter(isEmergency),
    );
    setNewNormalAppointmentsList(newAppointments.current.filter(isNormal));
  };

  // Filter appointment data into different categories
  const emergencyAppointments = appointments?.filter(isEmergency);
  const normalAppointments = appointments?.filter(isNormal);
  const scheduledAppointments = appointments?.filter(isScheduled);
  const cancelledAppointments = appointments?.filter(isCancelled);

  // Sort appointemnts by the last time they were modified
  scheduledAppointments?.sort((a: Appointment, b: Appointment): number =>
    compareDesc(new Date(a.modified_at ?? 0), new Date(b.modified_at ?? 0)),
  );

  cancelledAppointments?.sort((a: Appointment, b: Appointment): number =>
    compareDesc(new Date(a.modified_at ?? 0), new Date(b.modified_at ?? 0)),
  );

  return (
    <Tabs defaultValue="all" className="border p-2 rounded-md bg-background">
      <TabsList className="flex flex-col h-full gap-2 py-2 sm:inline-flex sm:flex-row sm:p-1">
        <TabsTrigger value="all">
          All{' '}
          {newEmergencyAppointmentsList.length > 0 ||
          newNormalAppointmentsList.length > 0
            ? `[${
                newEmergencyAppointmentsList.length +
                newNormalAppointmentsList.length
              }]`
            : ``}
        </TabsTrigger>
        <TabsTrigger value="emergency">
          Emergency{' '}
          {newEmergencyAppointmentsList.length > 0
            ? `[${newEmergencyAppointmentsList.length}]`
            : ``}
        </TabsTrigger>
        <TabsTrigger value="normal">
          Normal{' '}
          {newNormalAppointmentsList.length > 0
            ? `[${newNormalAppointmentsList.length}]`
            : ``}
        </TabsTrigger>
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
          newAppointments={[
            ...newEmergencyAppointmentsList,
            ...newNormalAppointmentsList,
          ]}
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
          newAppointments={[
            ...newEmergencyAppointmentsList,
            ...newNormalAppointmentsList,
          ]}
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
          newAppointments={[
            ...newEmergencyAppointmentsList,
            ...newNormalAppointmentsList,
          ]}
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
          newAppointments={[
            ...newEmergencyAppointmentsList,
            ...newNormalAppointmentsList,
          ]}
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
          newAppointments={[
            ...newEmergencyAppointmentsList,
            ...newNormalAppointmentsList,
          ]}
        />
      </TabsContent>
    </Tabs>
  );
};
