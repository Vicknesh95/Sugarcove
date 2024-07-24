const pool = require("../db/db");

const addToCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity, price, notes } = req.body;

    const cartItem = await pool.query(
      "SELECT * FROM carts WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    //check if the product is already in the cart, if it is when user click on it again can increment by 1
    if (cartItem.rows.length > 0) {
      const addQuantity = cartItem.rows[0].quantity + 1;
      const updatedCartItem = await pool.query(
        "UPDATE carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3",
        [addQuantity, user_id, product_id]
      );
      res.json("Item quantity increased");
    } else {
      const newCartItem = await pool.query(
        "INSERT INTO carts (user_id, product_id, quantity, price) VALUES ($1, $2, $3,(SELECT product_price FROM products WHERE id = $2))",
        [user_id, product_id, 1]
      );
      res.json("item added in cart");
    }
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error adding item to cart" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { user_id, product_id, quantity, notes } = req.body;
    const updatedCart = await pool.query(
      "UPDATE carts SET quantity = $1, notes = $2 WHERE user_id = $3 AND product_id = $4",
      [quantity, notes, user_id, product_id]
    );

    res.json("cart updated successfully");
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error updating cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;
    const deleteCartItem = await pool.query(
      "DELETE FROM carts WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    res.json("Item deleted from cart");
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error deleting item from cart" });
  }
};

const viewAllInCart = async (req, res) => {
  try {
    const { user_id } = req.body;
    const cartItems = await pool.query(
      "SELECT carts.*, products.product_name FROM carts JOIN products ON carts.product_id = products.id WHERE carts.user_id = $1",
      [user_id]
    );

    res.json(cartItems.rows);
  } catch (error) {
    console.error(error.message);
    res.json({ status: error, message: "error viewing cart" });
  }
};

const checkoutCartItems = async (req, res) => {
  const client = await pool.connect();
  try {
    const { user_id, delivery_address, contact_number } = req.body;

    await client.query("BEGIN");

    const newOrder = await client.query(
      "INSERT INTO orders (user_id, status, delivery_address, contact_number) VALUES ($1, 'PENDING PAYMENT', $2, $3) RETURNING id",
      [user_id, delivery_address, contact_number]
    );

    const order_id = newOrder.rows[0].id;

    const cartItems = await client.query(
      "SELECT * FROM carts WHERE user_id = $1",
      [user_id]
    );

    for (const cartItem of cartItems.rows) {
      await client.query(
        "INSERT INTO order_items (order_id, product_id, quantity, price, notes) VALUES ($1, $2, $3, $4, $5)",
        [
          order_id,
          cartItem.product_id,
          cartItem.quantity,
          cartItem.price,
          cartItem.notes,
        ]
      );
    }

    const clearCart = await client.query(
      "DELETE FROM carts WHERE user_id = $1",
      [user_id]
    );

    await client.query("COMMIT");
    res.json("Order placed successfully");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(error.message);
    res.json({ status: error, message: "error occured during checkout" });
  } finally {
    client.release();
  }
};

module.exports = {
  addToCart,
  updateCart,
  removeFromCart,
  viewAllInCart,
  checkoutCartItems,
};
