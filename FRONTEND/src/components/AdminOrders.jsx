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
      setOrders(groupOrdersById(data));
      console.log(groupOrdersById(data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const groupOrdersById = (orders) => {
    const groupedOrders = {}; //empty object to hold my grouped orders

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      if (!groupedOrders[order.order_id]) {
        //checks if the order_id is already part of groupedOrders object, if not it will create one
        groupedOrders[order.order_id] = {
          order_id: order.order_id,
          name: order.name,
          delivery_address: order.delivery_address,
          contact_number: order.contact_number,
          status: order.status,
          products: [], //products array for all my products and prices to go into
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
    //maps it, takes all the keys and puts into an array
  };

  useEffect(() => {
    if (userCtx.role === "ADMIN") {
      getAllOrders();
    }
  }, [userCtx.role]);

  const filterOrderStatus = (status) => {
    return orders.filter((order) => order.status === status);
  };

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
            <p>Total Amount: ${productTotal(order.products).toFixed(2)}</p>
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
            <p>Total Amount: ${productTotal(order.products).toFixed(2)}</p>
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
            <p>Total Amount: ${productTotal(order.products).toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
