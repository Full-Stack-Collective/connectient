'use client';

import React from 'react';

import { addMonths, format, isPast, isSunday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar({ monthLimit }: { monthLimit: number }) {
  const [selected, setSelected] = React.useState<Date>();

  const disabledDays = [isSunday, isPast];

  const monthsInAdvance = () => addMonths(new Date(), monthLimit);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={footer}
      disabled={disabledDays}
      toMonth={monthsInAdvance()}
    />
  );
}
