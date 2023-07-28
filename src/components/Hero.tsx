import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type HeroProps = {
  title: JSX.Element;
  subtitle: string;
  calloutBtn: {
    text: string;
    link: string;
  };
};

const Hero = ({ title, subtitle, calloutBtn }: HeroProps) => {
  return (
    <main className="m-auto py-28 sm:py-48 max-w-5xl flex flex-col gap-4 items-center justify-center">
      <h1 className="mt-8 mb-4 text-4xl font-extrabold tracking-wide leading-2 text-center md:text-6xl md:leading-snug">
        {title}
      </h1>
      <p className="mb-8 text-center max-w-4xl">{subtitle}</p>
      <Button
        asChild
        size="lg"
        className="uppercase font-sans text-sm sm:text-base tracking-wide max-w-sm"
      >
        <Link href={calloutBtn.link}>
          {calloutBtn.text} <ChevronRight className="h-4 w-4" />
        </Link>
      </Button>
    </main>
  );
};
export default Hero;
