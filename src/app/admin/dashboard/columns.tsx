'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'is_emergency',
    header: 'Is Emergency',
  },
  {
    accessorKey: 'first_name',
    header: 'First Name',
  },
  {
    accessorKey: 'last_name',
    header: 'Last Name',
  },
  {
    accessorKey: 'mobile_phone',
    header: 'Contact',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'appointment_type',
    header: 'Appointment Type',
  },
  {
    accessorKey: 'requested_date',
    header: 'Requested Date',
  },
  {
    accessorKey: 'requested_time',
    header: 'Requested Time',
  },
  {
    accessorKey: 'is_scheduled',
    header: 'Is Scheduled',
  },
  {
    accessorKey: 'scheduled_date',
    header: 'Scheduled Date',
  },
  {
    accessorKey: 'scheduled_time',
    header: 'Scheduled Time',
  },
  {
    accessorKey: 'is_cancelled',
    header: 'Is Cancelled',
  },
];
