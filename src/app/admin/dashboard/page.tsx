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
    <main className="flex-1 container mx-auto pt-4 pb-10">
      <h1 className="mt-8 mb-12 w-full text-4xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
        Connectient Control Tower:{' '}
        <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
          Elevating Patient Experiences
        </span>
      </h1>
      <DataTable columns={columns} data={data!} />
    </main>
  );
};

export default AppointmentDemo;
