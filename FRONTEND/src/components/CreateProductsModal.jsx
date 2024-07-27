import { React, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./css/modals.module.css";

const Overlay = (props) => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [allergens, setAllergens] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const addProduct = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          product_type: productType,
          product_description: productDescription,
          allergens: allergens,
          product_price: productPrice,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error adding product");
      }
      await response.json();

      props.setShowCreateModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <button onClick={() => props.setShowCreateModal(false)}>X</button>
        </div>
        <h1 className={styles.modalHeader}> New Product </h1>
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
        <button className={styles.addProductBtn} onClick={addProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

const CreateProductsModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowCreateModal={props.setShowCreateModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default CreateProductsModal;
