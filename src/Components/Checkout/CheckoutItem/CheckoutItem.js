import React from "react";
import classes from "./CheckoutItem.module.css";
const checkoutItem = (props) => (
  <div className={classes.CheckoutItem}>
    <div className={classes.Checkout__img}>
      <img src={props.img} alt="" />
    </div>
    <div className={classes.Checkout__name}>{props.name}</div>
    <div className={classes.Checkout__price}>
      {props.price} {props.currency}
    </div>
    <div className={classes.Checkout__pull_right}>
      <div className={classes.Checkout__qty}>
        <b>QTY:</b>
        {props.qty}
      </div>
    </div>
  </div>
);

export default checkoutItem;
