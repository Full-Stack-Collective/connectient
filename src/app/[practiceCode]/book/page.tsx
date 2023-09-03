import { AppointmentFooter } from '@/components/AppointmentFooter';
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
    .select()
    .eq('practice_code', practiceCode);

  if (!data || data?.length < 1) redirect('/');

  const [{ id, name, logo, street_address, city, phone }] = data as Practice[];

  return (
    <>
      <main className="flex-1 flex flex-col gap-2 justify-center items-center">
        <h1 className="mt-8 mb-6 w-full max-w-lg text-4xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
          Request Your{' '}
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
            Next Appointment
          </span>{' '}
          Expedition
        </h1>
        <AppointmentForm
          practiceId={id}
          practiceName={name}
          practiceLogo={logo}
        />
        <AppointmentFooter
          name={name}
          streetAddress={street_address as string}
          city={city}
          phone={phone!}
        />
      </main>
    </>
  );
}
