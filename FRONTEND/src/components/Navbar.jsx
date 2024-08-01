import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import user from "../context/user";
import styles from "./css/Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { accessToken, role, logout } = useContext(user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <nav>
        <div className={styles.navItems}>
          <ul>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/products">PRODUCTS</NavLink>
            </li>
            {accessToken && role === "USER" && (
              <li>
                <NavLink to="/cart">CART</NavLink>
              </li>
            )}
            {accessToken ? (
              <li>
                {accessToken && role === "ADMIN" ? (
                  <NavLink to="/admin-orders">ORDERS</NavLink>
                ) : (
                  <NavLink to="/orders">ORDERS</NavLink>
                )}
              </li>
            ) : null}
          </ul>
        </div>
        <div className={styles.title}>Sugarcove</div>
        <div className={styles.logoutContainer}>
          {accessToken ? (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <NavLink to="/login">LOGIN/REGISTER</NavLink>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
