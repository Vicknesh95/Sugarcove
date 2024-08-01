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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!quantity) newErrors.quantity = "Please specify quantity";
    if (!notes) newErrors.notes = "Notes is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getCartItems = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
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
    if (!validate()) return;
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
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
                {errors.quantity && <p>{errors.quantity}</p>}
                <textarea
                  placeholder="Notes"
                  defaultValue={item.notes}
                  onChange={(e) => {
                    setUpdatedItem(item.id);
                    setNotes(e.target.value);
                  }}
                />
                {errors.notes && <p>{errors.notes}</p>}
                <button
                  className={styles.editItemBtn}
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
        <ol>
          <li>Complete your order by clicking on the "Checkout" button.</li>
          <li>
            You will be prompted to input your delivery address and contact
            information{" "}
          </li>
          <li>
            Transfer the total amount to the following bank account:
            <ul>
              <li>Bank Name: POSB</li>
              <li>Account Number: 123456789</li>
              <li>Recipient Name: John Doe</li>
            </ul>
          </li>
          <li>Check your Orders page within 12 hours for status updates.</li>
          <li>
            Your order status will change from "Pending Payment" to "In
            Progress" once payment is confirmed.
          </li>
          <li>
            After successful delivery, the order status will change to
            "Completed."
          </li>
          <p className={styles.contact}>
            Please feel free to contact us at 12345678 regarding any payment or
            delivery related issues
          </p>
        </ol>
      </div>
      {showCheckoutModal && (
        <CheckoutCartModal
          setShowCheckOutModal={setShowCheckOutModal}
          getCartItems={getCartItems}
        />
      )}
    </div>
  );
};

export default Cart;
