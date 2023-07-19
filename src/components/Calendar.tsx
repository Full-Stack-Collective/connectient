'use client';

import React from 'react';

import { addMonths, format, isPast, isSunday, isToday } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function Calendar() {
  const [selected, setSelected] = React.useState<Date>();

  const disabledDays = [isSunday, isPast];

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
      toMonth={addMonths(new Date(), 3)}
    />
  );
}
