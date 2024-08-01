import React from "react";
import styles from "./css/Home.module.css"

const Home = () => {
  return (
    <div className="img-container">
      <img
        className={styles.img}
        src="https://images3.alphacoders.com/133/1338868.png"
        alt="food image"
      ></img>
    </div>
  );
};

export default Home;
