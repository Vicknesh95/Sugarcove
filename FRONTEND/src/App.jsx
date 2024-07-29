import { React, useState, useEffect } from "react";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/user";
import { jwtDecode } from "jwt-decode";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setUserId(decoded.id);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setRole("");
    setUserId("");
  };

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          userId,
          setUserId,
          logout,
        }}
      >
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
