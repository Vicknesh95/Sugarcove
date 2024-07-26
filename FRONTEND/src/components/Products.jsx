import React, { useEffect, useState } from "react";
import styles from "./css/Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
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

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      {products.map((product) => {
        return (
          <div className={styles.productCard} key={product.id}>
            <div className={styles.productName}>{product.product_name}</div>
            <div className={styles.productCategory}>{product.product_type}</div>
            <div className={styles.productDesc}>
              {product.product_description}
            </div>
            <div className={styles.productAllergens}>{product.allergens}</div>
            <div className={styles.price}>$40</div>
            <button className={styles.addToCartBtn}>Add to Cart</button>
          </div>
        );
      })}
    </>
  );
};

export default Products;
