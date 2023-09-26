export const dynamic = 'force-dynamic'; //remove this when proper fix has been implemented

import { AppointmentFooter } from '@/components/AppointmentFooter';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentHeader from '@/components/AppointmentHeader';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const supabase = createServerComponentClient<Database>({ cookies });

export async function generateMetadata({
  params,
}: {
  params: {
    practiceCode: string;
  };
}) {
  try {
    const { practiceCode } = params;
    const { data: practice } = await supabase
      .from('Practice')
      .select()
      .eq('practice_code', practiceCode);

    if (!practice || practice.length === 0)
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
      };

    const [{ name, logo }] = practice;
    const imageUrl = logo || '/connectient-logo.png';

    return {
      title: name,
      description: `Appointments Made Easy at ${name}`,
      openGraph: {
        images: [
          {
            url: imageUrl,

            alt: `${name} Logo`,
          },
        ],
      },
      alternates: {
        canonical: `/${practiceCode}/book`,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    };
  }
}

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

  const [{ id, name, logo, street_address, city, phone, website }] =
    data as Practice[];

  return (
    <>
      <main className="flex-1 flex flex-col gap-2 justify-center items-center">
        <AppointmentHeader practiceLogo={logo} practiceName={name} />
        <h2 className="mt-4 mb-6 w-full max-w-lg sm:text-3xl text-2xl font-extrabold tracking-wide leading-2 text-center md:leading-snug">
          Request Your{' '}
          <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
            Next Appointment
          </span>{' '}
          Expedition
        </h2>
        <AppointmentForm
          practiceId={id}
          practiceName={name}
          practiceLogo={logo!}
          practiceStreet={street_address as string}
          practiceCity={city}
          practicePhone={phone!}
          practiceWebsite={website!}
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
