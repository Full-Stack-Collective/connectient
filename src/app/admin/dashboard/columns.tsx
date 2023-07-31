'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/DataTableColumnHeader';

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'is_emergency',
    header: () => <p className="py-4 ">Emergency</p>,
  },
  {
    accessorKey: 'first_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue('first_name')}</p>
    ),
  },
  {
    accessorKey: 'last_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue('last_name')}</p>
    ),
  },
  {
    accessorKey: 'mobile_phone',
    header: () => <p className="py-4 w-32 text-center">Contact</p>,
    cell: ({ row }) => (
      <p className="text-right">{row.getValue('mobile_phone')}</p>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <p className="text-center">{row.getValue('email')}</p>,
  },
  {
    accessorKey: 'appointment_type',
    header: () => <div className="py-4 w-32 text-center">Appointment Type</div>,
    cell: ({ row }) => {
      const appointmentType: string = row.getValue('appointment_type');
      return (
        <p className="text-center">
          {appointmentType
            ? appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)
            : 'N/A'}
        </p>
      );
    },
  },
  {
    accessorKey: 'requested_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Requested Date" />
    ),
    cell: ({ row }) => {
      const dateISOFormat: string = row.getValue('requested_date');
      return (
        <p className="text-center">{new Date(dateISOFormat).toDateString()}</p>
      );
    },
  },
  {
    accessorKey: 'requested_time',
    header: () => <div className="py-4 w-40 text-center">Requested Time</div>,
    cell: ({ row }) => {
      const requestedTime: string = row.getValue('requested_time');
      return (
        <p className="text-center">
          {requestedTime
            ? requestedTime.charAt(0).toUpperCase() + requestedTime.slice(1)
            : 'N/A'}
        </p>
      );
    },
  },
  {
    accessorKey: 'is_scheduled',
    header: () => <div className="py-4 w-20 text-center">Scheduled</div>,
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      return (
        <p className="text-center">{isAppointmentScheduled ? '✔' : '✘'}</p>
      );
    },
  },
  {
    accessorKey: 'scheduled_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Scheduled Date" />
    ),
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      const dateISOFormat: string = row.getValue('scheduled_date');
      return (
        <p className="text-center">
          {isAppointmentScheduled
            ? new Date(dateISOFormat).toDateString()
            : '✘'}
        </p>
      );
    },
  },
  {
    accessorKey: 'scheduled_time',
    header: () => <div className="py-4 w-40 text-center">Scheduled Time</div>,
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      return (
        <p className="text-center">{isAppointmentScheduled ? '✔' : '✘'}</p>
      );
    },
  },
  {
    accessorKey: 'is_cancelled',
    header: () => <div className="py-4 w-20 text-center">Cancelled</div>,
    cell: ({ row }) => (
      <p className="text-center">{row.getValue('is_cancelled') ? '✔' : '✘'}</p>
    ),
  },
];
