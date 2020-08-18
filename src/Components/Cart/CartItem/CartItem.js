import React from "react";
import classes from "./CartItem.module.css";

const cartItem = (props) => (
  <div className={classes.CartItem}>
    <div className={classes.Cart__img}>
      <img src={props.img} alt="" />
    </div>
    <div className={classes.Cart__name}>{props.name}</div>
    <div className={classes.Cart__price}>
      {props.price} {props.currency}
    </div>
    <div className={classes.Cart__pull_right}>
      <span>
        <button onClick={props.removeQty} className={classes.Cart__qtyBtn}>
          -
        </button>
      </span>
      <div className={classes.Cart__qty}>{props.qty}</div>
      <span>
        <button onClick={props.addQty} className={classes.Cart__qtyBtn}>
          +
        </button>
      </span>
    </div>
    <div onClick={props.clicked} className={classes.Cart__delete}>
      <span className={classes.DelSpan1}>
        <span className={classes.DelSpan2}></span>
      </span>
    </div>
  </div>
);

export default cartItem;
