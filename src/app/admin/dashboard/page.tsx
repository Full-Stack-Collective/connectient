import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { columns } from './columns';
import { DataTable } from './data-table';

const supabase = createServerComponentClient<Database>({ cookies });

const getEmergencyAppointments = async () =>
  await supabase
    .from('Appointments')
    .select()
    .match({ is_emergency: true, is_scheduled: false, is_cancelled: false })
    .order('created_at', { ascending: false });

const getNormalAppointments = async () =>
  await supabase
    .from('Appointments')
    .select()
    .match({ is_emergency: false, is_scheduled: false, is_cancelled: false })
    .order('created_at', { ascending: false });

const getScheduledAppointments = async () =>
  await supabase
    .from('Appointments')
    .select()
    .match({ is_scheduled: true, is_cancelled: false })
    .order('created_at', { ascending: false });

const getCancelledAppointments = async () =>
  await supabase
    .from('Appointments')
    .select()
    .match({ is_cancelled: true })
    .order('created_at', { ascending: false });

const getAllAppointments = async () =>
  await supabase
    .from('Appointments')
    .select()
    .order('created_at', { ascending: false });

const AppointmentDemo = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/unauthenticated');
  }
  // Get all the data
  const { data: emergencyAppointments }: { data: Appointment[] | null } =
    await getEmergencyAppointments();
  const { data: normalAppointments }: { data: Appointment[] | null } =
    await getNormalAppointments();
  const { data: scheduledAppointments }: { data: Appointment[] | null } =
    await getScheduledAppointments();
  const { data: cancelledAppointments }: { data: Appointment[] | null } =
    await getCancelledAppointments();
  const { data: allAppointments }: { data: Appointment[] | null } =
    await getAllAppointments();

  return (
    <main className="flex-1 container mx-auto pt-4 pb-10">
      <h1 className="mt-8 mb-12 w-full text-4xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
        Connectient Control Tower:{' '}
        <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
          Elevating Patient Experiences
        </span>
      </h1>
      <Tabs
        defaultValue="emergency"
        className="border p-2 rounded-md bg-background"
      >
        <TabsList className="flex flex-col h-full gap-2 py-2 sm:inline-flex sm:flex-row sm:p-1">
          <TabsTrigger value="emergency">Emergency</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="emergency">
          <p className="text-sm p-4 text-muted-foreground">
            Emergency appointments section requires your immediate attention to
            schedule the appointments.
          </p>
          <DataTable columns={columns} data={emergencyAppointments!} />
        </TabsContent>
        <TabsContent value="normal">
          <p className="text-sm p-4 text-muted-foreground">
            Normal appointments section has all the appointments that are not an
            emergency, have not been scheduled yet, and have not been cancelled.
          </p>
          <DataTable columns={columns} data={normalAppointments!} />
        </TabsContent>
        <TabsContent value="scheduled">
          <p className="text-sm p-4 text-muted-foreground">
            Scheduled appointments section has all the appointments that have
            been scheduled recently.
          </p>
          <DataTable columns={columns} data={scheduledAppointments!} />
        </TabsContent>
        <TabsContent value="cancelled">
          <p className="text-sm p-4 text-muted-foreground">
            Cancelled appointments section has all the appointments that have
            been cancelled recently.
          </p>
          <DataTable columns={columns} data={cancelledAppointments!} />
        </TabsContent>
        <TabsContent value="all">
          <p className="text-sm p-4 text-muted-foreground">
            &apos;All&apos; appointments section has all the appointments
            regardless of the status.
          </p>
          <DataTable columns={columns} data={allAppointments!} />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default AppointmentDemo;
