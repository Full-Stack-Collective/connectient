import AppointmentForm from '@/components/AppointmentForm';
import { Toaster } from '@/components/ui/toaster';

export default function Appointment() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-2 justify-center items-center">
        <AppointmentForm />
      </main>
      <Toaster />
    </>
  );
}
