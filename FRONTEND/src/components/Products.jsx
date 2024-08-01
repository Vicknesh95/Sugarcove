import React, { useEffect, useState, useContext } from "react";
import styles from "./css/Products.module.css";
import CreateProductsModal from "./CreateProductsModal";
import UpdateProductsModal from "./UpdateProductsModal";
import UserContext from "../context/user";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState("");
  const userCtx = useContext(UserContext);

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
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
          id: id,
        }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("error deleting product");
      }

      getAllProducts();
    } catch (err) {
      console.error(err.message);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch(import.meta.env.VITE_SERVER + "/cart/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        throw new Error("Error adding item to cart");
      }
      await response.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {userCtx.role === "ADMIN" && (
        <button
          className={styles.addProductBtn}
          onClick={() => setShowCreateModal(true)}
        >
          Add Product
        </button>
      )}
      {showUpdateModal && (
        <UpdateProductsModal
          setShowUpdateModal={setShowUpdateModal}
          product={productToUpdate}
          getAllProducts={getAllProducts}
        />
      )}
      {showCreateModal && (
        <CreateProductsModal
          setShowCreateModal={setShowCreateModal}
          getAllProducts={getAllProducts}
        />
      )}
      <div className={styles.productsContainer}>
        {products.map((product) => {
          return (
            <div className={styles.productCard} key={product.id}>
              <div className={styles.productName}>{product.product_name}</div>
              <div className={styles.productCategory}>
                {product.product_type}
              </div>
              <div className={styles.productDesc}>
                {product.product_description}
              </div>
              <div className={styles.productAllergens}>{product.allergens}</div>
              <div className={styles.price}>${product.product_price}</div>
              {userCtx.role === "USER" && (
                <button
                  className={styles.addToCartBtn}
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              )}
              {userCtx.role === "ADMIN" && (
                <>
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
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Products;
