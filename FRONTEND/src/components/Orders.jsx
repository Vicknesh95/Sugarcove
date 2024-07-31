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
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setPendingOrders(groupOrdersById(data));
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
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setInProgressOrders(groupOrdersById(data));
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
        }
      );
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();

      setCompletedOrders(groupOrdersById(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const groupOrdersById = (orders) => {
    const groupedOrders = {};

    for (const order of orders) {
      if (!groupedOrders[order.order_id]) {
        groupedOrders[order.order_id] = {
          order_id: order.order_id,
          name: order.name,
          delivery_address: order.delivery_address,
          contact_number: order.contact_number,
          status: order.status,
          products: [],
        };
      }
      groupedOrders[order.order_id].products.push({
        product_id: order.product_id,
        product_name: order.product_name,
        quantity: order.quantity,
        price: order.price,
        notes: order.notes,
      });
    }

    return Object.keys(groupedOrders).map((key) => groupedOrders[key]);
  };

  useEffect(() => {
    if (userCtx.userId) {
      getPendingOrders(), getInProgressOrders(), getCompletedOrders();
    }
  }, [userCtx.userId]);

  const productTotal = (products) => {
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price * products[i].quantity;
    }
    return total;
  };

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
              {order.products.map((product) => (
                <div className={styles.product} key={product.product_id}>
                  <p>Product Name: {product.product_name}</p>
                  <p>Product Amount: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Notes: {product.notes}</p>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${productTotal(order.products)}</p>
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
              {order.products.map((product) => (
                <div className={styles.product} key={product.product_id}>
                  <p>Product Name: {product.product_name}</p>
                  <p>Product Amount: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Notes: {product.notes}</p>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${productTotal(order.products)}</p>
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
              {order.products.map((product) => (
                <div className={styles.product} key={product.product_id}>
                  <p>Product Name: {product.product_name}</p>
                  <p>Product Amount: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Notes: {product.notes}</p>
                </div>
              ))}
            </div>
            <div className={styles.orderTotal}>
              <p>Total Amount: ${productTotal(order.products)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
