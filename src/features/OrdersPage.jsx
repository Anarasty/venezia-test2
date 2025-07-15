import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import OrdersTable from "./OrdersTable";
import OrderForm from "./OrderForm";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";

import pdfMake from "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

import { deleteOrder } from "../redux/ordersSlice";
import "../scss/OrdersPage.scss";

const OrdersPage = () => {
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const closeForm = () => setEditingOrder(null);

  const handleDelete = (id) => setDeleteId(id);
  const confirmDelete = () => {
    dispatch(deleteOrder(deleteId));
    setDeleteId(null);
  };

  const exportToPDF = () => {
    pdfMake
      .createPdf({
        content: [
          { text: "Orders", style: "header", margin: [0, 0, 0, 10] },
          {
            table: {
              headerRows: 1,
              widths: ["auto", "*", "auto", "auto", "auto"],
              body: [
                ["№", "Client", "Date", "Status", "Amount"],
                ...orders.map(({ number, client, date, status, amount }) => [
                  number,
                  client,
                  date,
                  status,
                  amount,
                ]),
              ],
            },
          },
        ],
        styles: { header: { fontSize: 18, bold: true } },
      })
      .download("orders.pdf");
  };

  return (
    <div className="order-page">
      <h1>Orders</h1>

      <div className="btn-container">
        <button
          onClick={() =>
            setEditingOrder({
              number: "",
              client: "",
              date: "",
              status: "",
              amount: "",
            })
          }
        >
          Create Order
        </button>
        <button onClick={exportToPDF}>Export PDF</button>
      </div>

      <OrdersTable onEdit={setEditingOrder} onDelete={handleDelete} />

      <Modal isOpen={!!editingOrder} onClose={closeForm}>
        <OrderForm initialValues={editingOrder} onClose={closeForm} />
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        message="Are you sure you want to delete this order?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
};

export default OrdersPage;
