import Image from 'next/image';
import React from 'react';

export default function AppointmentHeader({
  practiceName,
  practiceLogo,
}: {
  practiceName: string;
  practiceLogo: string | null;
}) {
  return (
    <header className="bg-background">
      <div className="m-auto max-w-7xl w-full px-4 py-4 flex flex-col gap-2 sm:flex-row justify-between items-center relative">
        {practiceLogo && (
          <Image
            src={practiceLogo}
            width={120}
            height={120}
            alt={`Logo for a dental practice called ${practiceName}`}
          />
        )}
        {practiceName ? (
          <h1 className="text-2xl font-semibold text-slate-600">
            {practiceName}
          </h1>
        ) : null}
      </div>
    </header>
  );
}
