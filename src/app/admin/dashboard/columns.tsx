'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Appointment>[] = [
  {
    id: 'status',
    header: () => <p className="py-4 ">Status</p>,
    cell: ({ row }) => {
      const statusList: string[] = [];
      const isEmergency = row.original['is_emergency'];
      const isScheduled = row.original['is_scheduled'];
      const isCancelled = row.original['is_cancelled'];
      if (isEmergency) {
        statusList.push('Emergency');
      }
      if (isScheduled && !isCancelled) {
        statusList.push('Scheduled');
      }
      if (isCancelled) {
        statusList.push('Cancelled');
      }
      if (!isScheduled && !isCancelled) {
        statusList.push('Waiting');
      }
      return (
        <div className="flex gap-2">
          {statusList.map((status, index) => (
            <Badge key={index} variant="secondary">
              {status}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: 'full_name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <p className="text-center">{row.getValue('full_name')}</p>
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
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
