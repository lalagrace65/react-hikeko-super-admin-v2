import React, { useEffect, useMemo, useState } from 'react';
import { 
    useReactTable, 
    flexRender, 
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel,
 } from '@tanstack/react-table';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import { 
    FaAngleRight, 
    FaAngleLeft,
    FaAngleDoubleRight,
    FaAngleDoubleLeft } from "react-icons/fa";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
export default function DataTable({data, columns}) {
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting : sorting,
            globalFilter: filtering
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    });

    return (
        <div>
        <div className="flex items-center py-4">
            <Input
            placeholder="Filter ..."
            value={filtering}
            onChange={(event) => setFiltering(event.target.value)
            }
            className="max-w-sm"
            />
            
        </div>
        <Table className='min-w-full bg-white border border-gray-200 rounded-lg shadow'>
            <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <TableHead
                                key={header.id}
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {header.isPlaceholder ? null : (
                                    <div>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: '🔼',
                                            desc: '🔽'
                                        }[header.column.getIsSorted() ?? null]}
                                    </div>
                                )}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map(row => (
                    <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                {table.getFooterGroups().map(footerGroup => (
                    <TableRow key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <TableHead key={header.id}>
                                <div>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </div>
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableFooter> */}
        </Table>
        <div className="flex flex-col items-center justify-between space-y-4 px-2 lg:flex-row lg:space-y-0">
        <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
            <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                table.setPageSize(Number(value));
                }}
            >
                <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                {[6, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>
        </div>
        <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
            >
                <span className="sr-only">Go to first page</span>
                <FaAngleDoubleLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <span className="sr-only">Go to previous page</span>
                <FaAngleLeft className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <span className="sr-only">Go to next page</span>
                <FaAngleRight className="h-4 w-4" />
            </Button>
            <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
            >
                <span className="sr-only">Go to last page</span>
                <FaAngleDoubleRight className="h-4 w-4" />
            </Button>
            </div>
        </div>
        </div>
        </div>
           
    );
}
