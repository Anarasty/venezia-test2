import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../scss/OrdersTable.scss";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";

const OrdersTable = ({ onEdit, onDelete }) => {
  const orders = useSelector((state) => state.orders);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const column = createColumnHelper();
  const columns = [
    column.accessor("number", { header: "Number" }),
    column.accessor("client", { header: "Client" }),
    column.accessor("date", { header: "Date" }),
    column.accessor("status", { header: "Status" }),
    column.accessor("amount", { header: "Amount" }),
    column.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <>
          <button onClick={() => onEdit(row.original)}>Edit</button>
          <button onClick={() => onDelete(row.original.id)}>Delete</button>
        </>
      ),
    }),
  ];

  const table = useReactTable({
    data: orders,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="order-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: "pointer" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: " ↑",
                    desc: " ↓",
                  }[header.column.getIsSorted()] || ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={table.previousPage}
          disabled={!table.getCanPreviousPage()}
        >
          {"< Prev"}
        </button>
        <span>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button onClick={table.nextPage} disabled={!table.getCanNextPage()}>
          {"Next >"}
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
