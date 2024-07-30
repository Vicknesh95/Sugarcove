import { React, useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./css/modals.module.css";
import UserContext from "../context/user";

const Overlay = (props) => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [allergens, setAllergens] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const userCtx = useContext(UserContext);

  const updateProduct = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/product", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
          id: props.product.id,
          product_name: productName,
          product_type: productType,
          product_description: productDescription,
          allergens: allergens,
          product_price: productPrice,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error updating product");
      }
      await response.json();

      props.setShowUpdateModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <button onClick={() => props.setShowUpdateModal(false)}>X</button>
        </div>
        <h1 className={styles.modalHeader}> Edit Product Details </h1>
        <div>
          <div className={styles.modalInputContainer}>
            <p> Product Name: </p>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Product Type: </p>
            <input
              type="text"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Allergens: </p>
            <input
              type="text"
              value={allergens}
              onChange={(e) => setAllergens(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Product Price: </p>
            <input
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Product Description: </p>
            <textarea
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.addProductBtn} onClick={updateProduct}>
          Edit Product
        </button>
      </div>
    </div>
  );
};

const UpdateProductsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowUpdateModal={props.setShowUpdateModal}
          product={props.product}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateProductsModal;
