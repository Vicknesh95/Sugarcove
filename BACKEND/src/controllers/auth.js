const pool = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");

    const outputArray = [];
    for (const user of users.rows) {
      outputArray.push({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
    res.json(outputArray);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "error getting users" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const auth = await pool.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);
    //to check if got duplicate email
    if (auth.rows.length > 0) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    const hash = await bcrypt.hash(password, 12);

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
      [name, email, hash, role || "USER"]
    );

    res.json({ status: "ok", msg: "user created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const auth = await pool.query("SELECT * FROM users WHERE email = $1 ", [
      email,
    ]);

    // checking if the user is in db
    if (auth.rows.length === 0) {
      return res.status(401).json({ status: "error", msg: "not authorised" });
    }
    //storing user info into this variable
    // console.log(auth.rows[0]);
    const user = auth.rows[0];

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: user.email,
      role: user.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "login failed" });
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);
    const claims = { email: decoded.email, role: decoded.role };
    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    res.json({ access });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "refresh error" });
  }
};

module.exports = { getAllUsers, register, login, refresh };
