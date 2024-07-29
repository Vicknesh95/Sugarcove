import React, { useState, useEffect, useContext } from "react";
import styles from "./css/Orders.module.css";
import UserContext from "../context/user";

const Orders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const userCtx = useContext(UserContext);

  const getPendingOrders = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/orders/pending",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify({ user_id: userCtx.userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setPendingOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getInProgressOrders = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/orders/inProgress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify({ user_id: userCtx.userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setInProgressOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCompletedOrders = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/orders/completed",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify({ user_id: userCtx.userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setCompletedOrders(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userCtx.userId) {
      getPendingOrders(), getInProgressOrders(), getCompletedOrders();
    }
  }, [userCtx.userId]);

  return (
    <div className={styles.container}>
      <h1>ORDERS</h1>

      <h2>Pending Payment</h2>
      {pendingOrders.length === 0 ? (
        <p>No Pending Orders</p>
      ) : (
        pendingOrders.map((order) => (
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
              </div>
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${order.price * order.quantity}</p>
            </div>
          </div>
        ))
      )}

      <h2>In Progress</h2>
      {inProgressOrders.length === 0 ? (
        <p>No Orders In Progress</p>
      ) : (
        inProgressOrders.map((order) => (
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
              </div>
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${order.price * order.quantity}</p>
            </div>
          </div>
        ))
      )}

      <h2>Completed</h2>
      {completedOrders.length === 0 ? (
        <p>No Completed Orders</p>
      ) : (
        completedOrders.map((order) => (
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
              </div>
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${order.price * order.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
