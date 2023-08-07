'use client';

import { useState } from 'react';

import { MoreHorizontalIcon } from 'lucide-react';
import { Row } from '@tanstack/react-table';

import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';

import AdminAppointmentDetailsPopup from '@/components/AdminAppointmentDetailsPopup';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-full max-w-[100px]">
          <DropdownMenuItem onClick={() => setIsDetailsPopupOpen(true)}>
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem>Schedule</DropdownMenuItem>
          <DropdownMenuItem>Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDetailsPopupOpen && (
        <AdminAppointmentDetailsPopup
          open={isDetailsPopupOpen}
          onClose={() => setIsDetailsPopupOpen(false)}
          clickedAppointment={row.original as Appointment}
        />
      )}
    </>
  );
}
