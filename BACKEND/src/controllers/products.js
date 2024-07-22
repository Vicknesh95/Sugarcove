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

module.exports = { getProducts, addProducts };
