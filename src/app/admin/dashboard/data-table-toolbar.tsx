'use client';

import { XIcon } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter patients..."
          value={
            (table.getColumn('full_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('full_name')?.setFilterValue(event.target.value)
          }
          className="h-8 w-full  md:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <XIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
