import { React, useEffect, useState, useContext } from "react";
import styles from "./css/Cart.module.css";
import UserContext from "../context/user";
import CheckoutCartModal from "./CheckoutCartModal";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCheckoutModal, setShowCheckOutModal] = useState(false);
  const [updatedItem, setUpdatedItem] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState("");
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

  const updateCartItems = async (productId) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
          user_id: userCtx.userId,
          product_id: productId,
          quantity: quantity,
          notes: notes,
        }),
      });
      if (!response.ok) {
        throw new Error("Fetch error");
      }
      const data = await response.json();
      console.log(data);
      getCartItems();
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCartItem = async (productId) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
          user_id: userCtx.userId,
          product_id: productId,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error deleting item from cart");
      }
      await response.json();
      getCartItems();
    } catch (err) {
      console.error(err.message);
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
                <input
                  type="number"
                  min="1"
                  defaultValue={item.quantity}
                  onChange={(e) => {
                    setUpdatedItem(item.id);
                    setQuantity(e.target.value);
                  }}
                />
                <textarea
                  placeholder="Notes"
                  defaultValue={item.notes}
                  onChange={(e) => {
                    setUpdatedItem(item.id);
                    setNotes(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateCartItems(item.product_id);
                  }}
                >
                  Edit
                </button>
                <button
                  className={styles.removeItemBtn}
                  onClick={() => deleteCartItem(item.product_id)}
                >
                  Remove Item
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.orderSummary}>
        <h2>ORDER SUMMARY</h2>
        <ol>
          {cartItems.map((item) => {
            return (
              <li key={item.id}>
                {item.product_name} - ${item.price * item.quantity}
              </li>
            );
          })}
        </ol>
        <h3>Total: ${totalPrice}</h3>
        <button
          className={styles.checkoutBtn}
          onClick={() => setShowCheckOutModal(true)}
        >
          Checkout
        </button>
      </div>
      <div className={styles.payment}>
        <h2>Payment Instructions</h2>
      </div>
      {showCheckoutModal && (
        <CheckoutCartModal setShowCheckOutModal={setShowCheckOutModal} />
      )}
    </div>
  );
};

export default Cart;
