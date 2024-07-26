import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import user from "../context/user";
import styles from "./css/Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, logout } = useContext(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/products">PRODUCTS</NavLink>
          </li>
          {accessToken && (
            <>
              <li>
                <NavLink to="/cart">CART</NavLink>
              </li>
              <li>
                <NavLink to="/orders">ORDERS</NavLink>
              </li>
            </>
          )}
          <li>
            {accessToken ? (
              <button onClick={handleLogout}>LOGOUT</button>
            ) : (
              <NavLink to="/login">LOGIN/REGISTER</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
