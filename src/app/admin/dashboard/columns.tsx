'use client';

import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'is_emergency',
    header: () => <div className="py-4 text-lg">Emergency</div>,
  },
  {
    accessorKey: 'first_name',
    header: () => <div className="py-4 text-lg">First Name</div>,
  },
  {
    accessorKey: 'last_name',
    header: () => <div className="py-4 text-lg">Last Name</div>,
  },
  {
    accessorKey: 'mobile_phone',
    header: () => <div className="py-4 text-lg">Contact</div>,
  },
  {
    accessorKey: 'email',
    header: () => <div className="py-4 text-lg">Email</div>,
  },
  {
    accessorKey: 'appointment_type',
    header: () => <div className="py-4 text-lg">Appointment Type</div>,
  },
  {
    accessorKey: 'requested_date',
    header: () => <div className="py-4 text-lg">Requested Date</div>,
    cell: ({ row }) => {
      const dateISOFormat: string = row.getValue('requested_date');
      return new Date(dateISOFormat).toDateString();
    },
  },
  {
    accessorKey: 'requested_time',
    header: () => <div className="py-4 text-lg">Requested Time</div>,
  },
  {
    accessorKey: 'is_scheduled',
    header: () => <div className="py-4 text-lg">Scheduled</div>,
  },
  {
    accessorKey: 'scheduled_date',
    header: () => <div className="py-4 text-lg">Scheduled Date</div>,
    cell: ({ row }) => {
      const dateISOFormat: string = row.getValue('scheduled_date');
      return new Date(dateISOFormat).toDateString();
    },
  },
  {
    accessorKey: 'scheduled_time',
    header: () => <div className="py-4 text-lg">Scheduled Time</div>,
  },
  {
    accessorKey: 'is_cancelled',
    header: () => <div className="py-4 text-lg">Cancelled</div>,
  },
];
