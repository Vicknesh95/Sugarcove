import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
          <li>
            <NavLink to="/cart">CART</NavLink>
          </li>
          <li>
            <NavLink to="/orders">ORDERS</NavLink>
          </li>
          <li>
            <NavLink to="/login">LOGIN</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
