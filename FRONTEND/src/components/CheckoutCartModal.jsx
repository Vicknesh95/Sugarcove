import { React, useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./css/modals.module.css";
import UserContext from "../context/user";

const Overlay = (props) => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const userCtx = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!address) newErrors.address = "Valid Address is needed for delivery ";
    if (!contact)
      newErrors.contact = "Valid Contact number is needed for delivery";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addDeliveryDetails = async () => {
    if (!validate()) return;
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/cart/checkout",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify({
            delivery_address: address,
            contact_number: contact,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("error checking out cart");
      }
      await response.json();

      props.setShowCheckOutModal(false);
      props.getCartItems();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div>
          <button
            className={styles.delBtn}
            onClick={() => props.setShowCheckOutModal(false)}
          >
            X
          </button>
        </div>
        <h1 className={styles.modalHeader}>
          Please fill in the following for delivery
        </h1>
        <div>
          <div className={styles.modalInputContainer}>
            <p> Delivery Address: </p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p>{errors.address}</p>}
          </div>
          <div className={styles.modalInputContainer}>
            <p> Contact Number: </p>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            {errors.contact && errors.contact}
          </div>
        </div>
        <button className={styles.checkoutBtn} onClick={addDeliveryDetails}>
          Checkout
        </button>
      </div>
    </div>
  );
};

const CheckoutCartModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowCheckOutModal={props.setShowCheckOutModal}
          getCartItems={props.getCartItems}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CheckoutCartModal;
