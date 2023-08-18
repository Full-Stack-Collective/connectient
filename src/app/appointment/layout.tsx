import { redirect } from 'next/navigation';

export default function InvalidAppointment() {
  redirect('/');
  return null;
}
