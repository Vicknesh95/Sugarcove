import { React, useState } from "react";
import styles from "./css/modals.module.css";
import ReactDOM from "react-dom";

const Overlay = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/register",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("error in profile registration");
      }
      await response.json();
      props.setShowUpdateModal(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <button onClick={() => props.setShowUpdateModal(false)}>X</button>
        </div>
        <h1 className={styles.modalHeader}> Register </h1>
        <div>
          <div className={styles.modalInputContainer}>
            <p> Name: </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Email: </p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.modalInputContainer}>
            <p> Password: </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.registerBtn} onClick={registerUser}>
          Register
        </button>
      </div>
    </div>
  );
};

const RegisterModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay setShowUpdateModal={props.setShowUpdateModal} />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default RegisterModal;
