import React, { useEffect, useState } from "react";
import styles from "./css/Products.module.css";
import CreateProductsModal from "./CreateProductsModal";
import UpdateProductsModal from "./UpdateProductsModal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  const getAllProducts = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response) {
        throw new Error("fetch error");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error deleting product");
      }
      await response.json();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <button
        className={styles.addProductBtn}
        onClick={() => setShowCreateModal(true)}
      >
        Add Product
      </button>
      {showUpdateModal && (
        <UpdateProductsModal
          setShowUpdateModal={setShowUpdateModal}
          product={productToUpdate}
        />
      )}
      {showCreateModal && (
        <CreateProductsModal setShowCreateModal={setShowCreateModal} />
      )}
      {products.map((product) => {
        return (
          <div className={styles.productCard} key={product.id}>
            <div className={styles.productName}>{product.product_name}</div>
            <div className={styles.productCategory}>{product.product_type}</div>
            <div className={styles.productDesc}>
              {product.product_description}
            </div>
            <div className={styles.productAllergens}>{product.allergens}</div>
            <div className={styles.price}>${product.product_price}</div>
            <button className={styles.addToCartBtn}>Add to Cart</button>
            <button
              className={styles.updateProductBtn}
              onClick={() => {
                setShowUpdateModal(true);
                setProductToUpdate(product);
              }}
            >
              Edit
            </button>
            <button
              className={styles.deleteProductBtn}
              onClick={() => deleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default Products;
