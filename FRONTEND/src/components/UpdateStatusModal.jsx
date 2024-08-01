import { React, useState, useContext } from "react";
import ReactDOM from "react-dom";
import styles from "./css/modals.module.css";
import UserContext from "../context/user";

const Overlay = (props) => {
  const userCtx = useContext(UserContext);
  const [status, setStatus] = useState("");

  const updateStatus = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/orders/update",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userCtx.accessToken}`,
          },
          body: JSON.stringify({
            order_id: props.selectedOrder.order_id,
            status: status,
          }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("error updating product");
      }
      await response.json();

      props.setShowUpdateModal(false);
      props.getAllOrders();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <div className={styles.delBtn}>
          <button
            className={styles.delBtn}
            onClick={() => props.setShowUpdateModal(false)}
          >
            X
          </button>
        </div>
        <h1 className={styles.modalHeader}> Update Order Status </h1>
        <div className={styles.updateContainer}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="PENDING PAYMENT">Pending Payment</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button className={styles.updateStatusBtn} onClick={updateStatus}>
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateStatusModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          setShowUpdateModal={props.setShowUpdateModal}
          selectedOrder={props.selectedOrder}
          getAllOrders={props.getAllOrders}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default UpdateStatusModal;
