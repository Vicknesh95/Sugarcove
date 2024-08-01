require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const products = require("./src/routers/products");
const auth = require("./src/routers/auth");
const carts = require("./src/routers/carts");
const orders = require("./src/routers/orders");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(cors()); 
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", products);
app.use("/auth", auth);
app.use("/cart", carts);
app.use("/orders", orders);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
