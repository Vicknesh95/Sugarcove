import { React, useEffect, useState, useContext } from "react";
import styles from "./css/Cart.module.css";
import UserContext from "../context/user";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const userCtx = useContext(UserContext);

  const getCartItems = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({ user_id: userCtx.userId }),
      });
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      setCartItems(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (userCtx.userId) {
      getCartItems();
    }
  }, [userCtx.userId]);

  let totalPrice = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalPrice += cartItems[i].price * cartItems[i].quantity;
  }

  return (
    <div className={styles.cartContainer}>
      <h1>SHOPPING CART</h1>
      <div className={styles.cartItems}>
        {cartItems.map((item) => {
          return (
            <div className={styles.cartItem} key={item.id}>
              <div className={styles.itemDetails}>
                <p>{item.product_name}</p>
                <p>{item.product_price}</p>
                <input type="number" min="1" defaultValue={item.quantity} />
                <textarea placeholder="Notes" defaultValue={item.notes} />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.orderSummary}>
        <h2>ORDER SUMMARY</h2>
        <ul>
          {cartItems.map((item) => {
            return (
              <li key={item.id}>
                {item.product_name} - ${item.price * item.quantity}
              </li>
            );
          })}
        </ul>
        <h3>Total: ${totalPrice}</h3>
        <button className={styles.checkoutBtn}>Checkout</button>
      </div>
      <div className={styles.payment}>
        <h2>Payment Instructions</h2>
      </div>
    </div>
  );
};

export default Cart;
