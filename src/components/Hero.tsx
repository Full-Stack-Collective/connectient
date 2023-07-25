import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
  return (
    <main className="m-auto py-28 sm:py-48 max-w-5xl flex flex-col gap-4 items-center justify-center">
      <h1 className="mt-8 mb-4 text-4xl font-extrabold leading-10 tracking-wide text-center md:text-6xl">
        An{' '}
        <span className="w-full text-transparent bg-clip-text leading-10 bg-gradient-to-r from-blue-400 to-rose-500">
          Effortless Appointment Request System
        </span>{' '}
        for Better Healthcare
      </h1>
      <p className="mb-8 text-center max-w-4xl">
        The ultimate solution for simplifying and streamlining the process of
        scheduling healthcare appointments. Say goodbye to lengthy phone calls
        and endless waiting times, and say hello to effortless appointment
        management.
      </p>
      <Button
        asChild
        size="lg"
        className="uppercase font-sans text-sm sm:text-base tracking-wide max-w-sm"
      >
        <Link href="/appointment">
          Request Appointment <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </main>
  );
};
export default Hero;
