import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersTable from "./OrdersTable";
import OrderForm from "./OrderForm";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";

import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";  

import { deleteOrder } from "../redux/ordersSlice";

import '../scss/OrdersPage.scss';

const OrdersPage = () => {
  const [editingOrder, setEditingOrder] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteId));
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setConfirmOpen(false);
  };

  const exportToPDF = () => {
    const docDefinition = {
      content: [
        { text: "Orders", style: "header", margin: [0, 0, 0, 10] },
        {
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto", "auto"],
            body: [
              ["№", "Client", "Date", "Status", "Amount"],
              ...orders.map((o) => [
                o.number,
                o.client,
                o.date,
                o.status,
                o.amount,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 18, bold: true },
      },
    };

    pdfMake.createPdf(docDefinition).download("orders.pdf");
  };

  const handleCreateOrder = () => {
    setEditingOrder({
      number: "",
      client: "",
      date: "",
      status: "",
      amount: "",
    });
  };

  return (
    <div className="order-page">
      <h1>Orders</h1>

      <div className="btn-container">
        <button onClick={handleCreateOrder}>Create Order</button>
        <button onClick={exportToPDF}>Export PDF</button>
      </div>

      <OrdersTable onEdit={setEditingOrder} onDelete={handleDelete} />

      <Modal isOpen={!!editingOrder} onClose={() => setEditingOrder(null)}>
        <OrderForm
          initialValues={editingOrder}
          onClose={() => setEditingOrder(null)}
        />
      </Modal>

      <ConfirmModal
        isOpen={confirmOpen}
        message="Are you sure you want to delete this order?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default OrdersPage;