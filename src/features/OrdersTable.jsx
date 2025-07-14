import React from 'react';
import { useSelector } from 'react-redux';
// import { deleteOrder } from '../redux/ordersSlice';
// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
import '../scss/OrdersTable.scss';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
// pdfMake.vfs = pdfFonts.vfs;

const columnHelper = createColumnHelper();

const OrdersTable = ({ onEdit, onDelete }) => {
    const orders = useSelector(state => state.orders);
  
    const columns = [
      columnHelper.accessor('number', {
        header: 'Number',
      }),
      columnHelper.accessor('client', {
        header: 'Client',
      }),
      columnHelper.accessor('date', {
        header: 'Date',
      }),
      columnHelper.accessor('status', {
        header: 'Status',
      }),
      columnHelper.accessor('amount', {
        header: 'Amount',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <>
            <button onClick={() => onEdit(info.row.original)}>Edit</button>
            <button onClick={() => onDelete(info.row.original.id)}>Delete</button>
          </>
        ),
      }),
    ];
  
    const table = useReactTable({
      data: orders,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });
  
    // const exportToPDF = () => {
    //   const docDefinition = {
    //     content: [
    //       { text: 'Orders', style: 'header' },
    //       {
    //         table: {
    //           body: [
    //             ['Number', 'Client', 'Date', 'Status', 'Amount'],
    //             ...orders.map(o => [o.number, o.client, o.date, o.status, o.amount]),
    //           ],
    //         },
    //       },
    //     ],
    //   };
    //   pdfMake.createPdf(docDefinition).download('orders.pdf');
    // };
  
    return (
      <div className='order-container'>
        {/* <button onClick={exportToPDF}>Export to PDF</button> */}
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrdersTable;