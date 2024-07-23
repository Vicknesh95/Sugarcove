const pool = require("../db/db");

const getProducts = async (req, res) => {
  try {
    const allProducts = await pool.query("SELECT * FROM products");
    res.json(allProducts.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, msg: "error getting all products" });
  }
};

const addProducts = async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      product_price,
      product_description,
      allergens,
      image_url,
    } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO products (product_name, product_type, product_price, product_description, allergens, image_url) VALUES($1, $2, $3, $4, $5, $6)",
      [
        product_name,
        product_type,
        product_price,
        product_description,
        allergens,
        image_url,
      ]
    );

    res.json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, msg: "error adding products" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      product_price,
      product_description,
      allergens,
      image_url,
      id,
    } = req.body;

    const updatedProducts = await pool.query(
      "UPDATE products SET product_name = $1, product_type = $2, product_price = $3, product_description = $4, allergens = $5, image_url = $6 WHERE id = $7 RETURNING *",
      [
        product_name,
        product_type,
        product_price,
        product_description,
        allergens,
        image_url,
        id,
      ]
    );

    res.json(updatedProducts.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error updating products" });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.body;
    const deleteProduct = await pool.query(
      "DELETE FROM products WHERE id = $1",
      [id]
    );

    res.json("product deleted successfully");
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error deleting products" });
  }
};
module.exports = { getProducts, addProducts, updateProducts, deleteProducts };
