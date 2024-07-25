const pool = require("../db/db");

const getPendingOrders = async (req, res) => {
  try {
    const { user_id } = req.body;

    const pendingOrders = await pool.query(
      "SELECT orders.id AS order_id, users.name, orders.delivery_address, orders.contact_number, orders.status, order_items.product_id, order_items.quantity, order_items.price, products.product_name FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = $1 AND orders.status = 'PENDING PAYMENT'",
      [user_id]
    );

    res.json(pendingOrders.rows);
  } catch (error) {
    console.error(error);
    res.json({ status: error, message: "error getting pending orders" });
  }
};

const getInProgressOrders = async (req, res) => {
  try {
    const { user_id } = req.body;

    const ordersInProgress = await pool.query(
      "SELECT orders.id AS order_id, users.name, orders.delivery_address, orders.contact_number, orders.status, order_items.product_id, order_items.quantity, order_items.price, products.product_name FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = $1 AND orders.status = 'IN PROGRESS'",
      [user_id]
    );

    res.json(ordersInProgress.rows);
  } catch (error) {
    console.error(error);
    res.json({ status: error, message: "error getting orders in progress" });
  }
};

const getCompletedOrders = async (req, res) => {
  try {
    const { user_id } = req.body;

    const completedOrders = await pool.query(
      "SELECT orders.id AS order_id, users.name, orders.delivery_address, orders.contact_number, orders.status, order_items.product_id, order_items.quantity, order_items.price, products.product_name FROM orders JOIN users ON orders.user_id = users.id JOIN order_items ON orders.id = order_items.order_id JOIN products ON order_items.product_id = products.id WHERE orders.user_id = $1 AND orders.status = 'COMPLETED'",
      [user_id]
    );

    res.json(completedOrders.rows);
  } catch (error) {
    console.error(error);
    res.json({ status: error, message: "error getting completed orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;

    const updateStatus = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2",
      [status, order_id]
    );

    res.json("order updated successfully");
  } catch (error) {
    console.error(error);
    res.json({ status: error, message: "error updating status" });
  }
};

module.exports = {
  getPendingOrders,
  getInProgressOrders,
  getCompletedOrders,
  updateOrderStatus,
};
