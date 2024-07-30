import { React, useEffect, useContext, useState } from "react";
import styles from "./css/Orders.module.css";
import UserContext from "../context/user";

const AdminOrders = () => {
  const userCtx = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/orders/admin",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userCtx.role === "ADMIN") {
      getAllOrders();
    }
  }, [userCtx.role]);

  const filterOrderStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className={styles.container}>
      <h1>ORDERS</h1>

      <h2>Pending Payment</h2>

      {filterOrderStatus("PENDING PAYMENT").map((order) => (
        <div className={styles.orderContainer} key={order.order_id}>
          <div className={styles.orderHeader}>
            <p>Order ID: {order.order_id}</p>
            <p>Name: {order.name}</p>
            <p>Delivery Address: {order.delivery_address}</p>
            <p>Contact Number: {order.contact_number}</p>
            <p>Status: {order.status}</p>
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.product}>
              <p>Product Name: {order.product_name}</p>
              <p>Product Amount: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Notes: {order.notes}</p>
            </div>
          </div>
          <div className={styles.orderTotal}>
            <p>Total Amount: ${order.price * order.quantity}</p>
          </div>
        </div>
      ))}

      <h2>In Progress</h2>

      {filterOrderStatus("IN PROGRESS").map((order) => (
        <div className={styles.orderContainer} key={order.order_id}>
          <div className={styles.orderHeader}>
            <p>Order ID: {order.order_id}</p>
            <p>Name: {order.name}</p>
            <p>Delivery Address: {order.delivery_address}</p>
            <p>Contact Number: {order.contact_number}</p>
            <p>Status: {order.status}</p>
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.product}>
              <p>Product Name: {order.product_name}</p>
              <p>Product Amount: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Notes: {order.notes}</p>
            </div>
          </div>
          <div className={styles.orderTotal}>
            <p>Total Amount: ${order.price * order.quantity}</p>
          </div>
        </div>
      ))}

      <h2>Completed</h2>

      {filterOrderStatus("COMPLETED").map((order) => (
        <div className={styles.orderContainer} key={order.order_id}>
          <div className={styles.orderHeader}>
            <p>Order ID: {order.order_id}</p>
            <p>Name: {order.name}</p>
            <p>Delivery Address: {order.delivery_address}</p>
            <p>Contact Number: {order.contact_number}</p>
            <p>Status: {order.status}</p>
          </div>
          <div className={styles.orderDetails}>
            <div className={styles.product}>
              <p>Product Name: {order.product_name}</p>
              <p>Product Amount: ${order.price}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Notes: {order.notes}</p>
            </div>
          </div>
          <div className={styles.orderTotal}>
            <p>Total Amount: ${order.price * order.quantity}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
