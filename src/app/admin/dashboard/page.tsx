import { columns } from './columns';
import { DataTable } from './data-table';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getAllAppointments = async () => {
  const supabase = createServerComponentClient({ cookies });
  return await supabase.from('Appointments').select();
};

const AppointmentDemo = async () => {
  const { data }: { data: Appointment[] | null } = await getAllAppointments();
  return (
    <div className="flex-1 container mx-auto py-10">
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default AppointmentDemo;
