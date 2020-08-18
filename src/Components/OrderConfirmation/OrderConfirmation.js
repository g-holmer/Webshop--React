import React from "react";
import classes from "./OrderConfirmation.module.css";
const order = (props) => (
  <div className={classes.Overlay}>
    <div className={classes.Order__Wrapper}>
      <div className={classes.Order}>
        <h2>Order: #DKAH4ASKD</h2>
        Your order has been placed!<br></br>
        Contact our staff: gholmerportfolio@staff.se for more information!
      </div>
      <button onClick={props.clicked} className={classes.Btn}>Back</button>
    </div>
  </div>
);

export default order;
