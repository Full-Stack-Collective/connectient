import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { DataTabs } from './data-tabs';
import PracticeEmailData from '@/types/PracticeEmailData';

const getAllAppointments = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  return await supabase
    .from('Appointments')
    .select()
    .order('created_at', { ascending: false });
};

const getUserPracticeInfo = async (
  email: string,
): Promise<PracticeEmailData | null> => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const userData = await supabase
    .from('Users')
    .select('practice_id')
    .eq('email', email)
    .single();

  if (userData.error || !userData.data) {
    return null;
  }

  const practiceID = userData.data.practice_id;

  const { data: practiceInfo }: { data: PracticeEmailData | null } =
    await supabase
      .from('Practice')
      .select('name, logo, city, phone, email, website, street_address')
      .eq('id', practiceID!)
      .single();

  return practiceInfo || null;
};

const AppointmentDashboard = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/admin/login');
  }
  const email = session.user.email;

  if (!email) {
    console.error('Something went wrong');
    return null;
  }
  const practiceInfo = await getUserPracticeInfo(email);

  const { data: appointments }: { data: Appointment[] | null } =
    await getAllAppointments();

  return (
    <main className="flex-1 container mx-auto pt-4 pb-10">
      {practiceInfo && (
        <div className=" text-3xl font-bold flex justify-center text-center items-center gap-4">
          {practiceInfo.logo && (
            <Image
              src={practiceInfo.logo}
              alt={practiceInfo.name || ''}
              width={120}
              height={120}
            />
          )}
          {practiceInfo.name} Dashboard
        </div>
      )}
      <h1 className="mt-4 mb-12 text-2xl w-full  font-extrabold tracking-wide leading-2 text-center md:leading-snug">
        Connectient Control Tower:{' '}
        <span className="w-full text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-rose-500">
          Elevating Patient Experiences
        </span>
      </h1>
      <DataTabs appointments={appointments} practiceInfo={practiceInfo} />
    </main>
  );
};

export default AppointmentDashboard;
