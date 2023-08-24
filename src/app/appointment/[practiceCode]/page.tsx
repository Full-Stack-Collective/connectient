import { AppointmentFooter } from '@/components/AppointmentFooter';
import AppointmentForm from '@/components/AppointmentForm';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';

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

  const [{ id, name, logo, street_addresss, city, phone }] = data as Practice[];

  return (
    <>
      <main className="flex-1 flex flex-col gap-2 justify-center items-center">
        <div>
          {name ? (
            <h1 className="text-2xl font-semibold">Welcome to {name}</h1>
          ) : null}
          {logo ? (
            <Image
              src={logo}
              className="h-28 w-28 object-contain mx-auto"
              alt={`Logo for a dental practice called ${name}`}
            />
          ) : null}
        </div>
        <AppointmentForm practiceId={id} />
        <AppointmentFooter
          name={name}
          streetAddress={street_addresss!}
          city={city}
          phone={phone!}
        />
      </main>
    </>
  );
}
