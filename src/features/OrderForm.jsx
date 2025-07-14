import React from "react";
import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { addOrder, updateOrder } from "../redux/ordersSlice";
import "../scss/OrderForm.scss";

const OrderForm = ({ initialValues, onClose }) => {
  const dispatch = useDispatch();
  const isEdit = !!initialValues?.id;

  return (
    <Formik
      initialValues={
        initialValues || {
          number: "",
          client: "",
          date: "",
          status: "",
          amount: "",
        }
      }
      validate={(values) => {
        const errors = {};
        if (!values.number) errors.number = "Required";
        if (!values.client) errors.client = "Required";
        if (!values.date) errors.date = "Required";
        if (!values.status) errors.status = "Required";
        if (!values.amount) errors.amount = "Required";
        return errors;
      }}
      onSubmit={(values) => {
        if (isEdit) {
          dispatch(updateOrder({ ...values, id: initialValues.id }));
        } else {
          dispatch(addOrder(values));
        }
        onClose();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="form-container">
            <label>Number</label>
            <Field name="number">
              {({ field }) => (
                <input
                  {...field}
                  placeholder={
                    touched.number && errors.number
                      ? errors.number
                      : "Enter number"
                  }
                  className={touched.number && errors.number ? "error" : ""}
                />
              )}
            </Field>
          </div>
          <div className="form-container">
            <label>Client</label>
            <Field name="client">
              {({ field }) => (
                <input
                  {...field}
                  placeholder={
                    touched.client && errors.client
                      ? errors.client
                      : "Enter client"
                  }
                  className={touched.client && errors.client ? "error" : ""}
                />
              )}
            </Field>
          </div>
          <div className="form-container">
            <label>Date</label>
            <Field name="date">
              {({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={touched.date && errors.date ? "error" : ""}
                />
              )}
            </Field>
          </div>
          <div className="form-container">
            <label>Status</label>
            <Field name="status">
              {({ field }) => (
                <input
                  {...field}
                  placeholder={
                    touched.status && errors.status
                      ? errors.status
                      : "Enter status"
                  }
                  className={touched.status && errors.status ? "error" : ""}
                />
              )}
            </Field>
          </div>
          <div className="form-container">
            <label>Amount</label>
            <Field name="amount">
              {({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder={
                    touched.amount && errors.amount
                      ? errors.amount
                      : "Enter amount"
                  }
                  className={touched.amount && errors.amount ? "error" : ""}
                />
              )}
            </Field>
          </div>

          <div className="btn-container">
            <button type="submit">{isEdit ? "Update" : "Create"}</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
