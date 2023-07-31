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
    cell: ({ row }) => {
      const appointmentType: string = row.getValue('appointment_type');
      return appointmentType
        ? appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)
        : 'N/A';
    },
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
    cell: ({ row }) => {
      const requestedTime: string = row.getValue('requested_time');
      return requestedTime
        ? requestedTime.charAt(0).toUpperCase() + requestedTime.slice(1)
        : 'N/A';
    },
  },
  {
    accessorKey: 'is_scheduled',
    header: () => <div className="py-4 text-lg">Scheduled</div>,
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      return isAppointmentScheduled ? '✔' : '✘';
    },
  },
  {
    accessorKey: 'scheduled_date',
    header: () => <div className="py-4 text-lg">Scheduled Date</div>,
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      const dateISOFormat: string = row.getValue('scheduled_date');
      return isAppointmentScheduled
        ? new Date(dateISOFormat).toDateString()
        : '✘';
    },
  },
  {
    accessorKey: 'scheduled_time',
    header: () => <div className="py-4 text-lg">Scheduled Time</div>,
    cell: ({ row }) => {
      const isAppointmentScheduled: boolean = row.getValue('is_scheduled');
      return isAppointmentScheduled ? '✔' : '✘';
    },
  },
  {
    accessorKey: 'is_cancelled',
    header: () => <div className="py-4 text-lg">Cancelled</div>,
    cell: ({ row }) => (row.getValue('is_cancelled') ? '✔' : '✘'),
  },
];
