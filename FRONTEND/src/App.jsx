import { React, useState } from "react";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");

  return (
    <div>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, role, setRole }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
