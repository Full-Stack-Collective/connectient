import AppointmentForm from '@/components/AppointmentForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const supabase = createServerComponentClient<Database>({ cookies });

export default async function Appointment({
  params,
}: {
  params: { practiceCode: string };
}) {
  const { practiceCode } = params;

  const { data } = await supabase
    .from('Practice')
    .select('id, name')
    .eq('practice_code', practiceCode);

  if (!data || data?.length < 1) redirect('/');

  const [{ id, name, logo }] = data as Practice[];

  return (
    <>
      <main className="flex-1 flex flex-col gap-2 justify-center items-center">
        {name ? (
          <h1 className="text-2xl font-semibold">Welcome to {name}</h1>
        ) : null}

        <AppointmentForm practiceId={id} />
      </main>
    </>
  );
}
