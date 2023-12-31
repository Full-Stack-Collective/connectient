'use client';
import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import AdminAppointmentDetailsPopup from '@/components/AdminAppointmentDetailsPopup';
import type PracticeEmailData from '@/types/PracticeEmailData';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  practiceInfo: PracticeEmailData | null;
  handleAppointmentClick: (selectedAppointmentId: string) => void;
  newAppointments: Appointment[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  practiceInfo,
  handleAppointmentClick,
  newAppointments,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isDetailsPopupOpen, setIsDetailsPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Appointment | null>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
  });

  const handleRowClick = (selectedRow: Appointment) => {
    setIsDetailsPopupOpen(true);
    setSelectedRow(selectedRow);
    handleAppointmentClick(selectedRow.id!);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <DataTableToolbar table={table} />
      </div>
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleRowClick(row.original as Appointment)}
                  className={cn(
                    'hover:cursor-pointer',
                    newAppointments.length !== 0 &&
                      newAppointments.some(
                        (appointment) =>
                          appointment.id === (row.original as Appointment).id,
                      ) &&
                      'bg-highlight',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isDetailsPopupOpen && (
        <AdminAppointmentDetailsPopup
          open={isDetailsPopupOpen}
          onClose={() => setIsDetailsPopupOpen(false)}
          clickedAppointment={selectedRow!}
          practiceInfo={practiceInfo}
        />
      )}
      <DataTablePagination table={table} />
    </div>
  );
};
