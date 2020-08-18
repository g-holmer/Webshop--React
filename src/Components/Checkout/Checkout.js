import React from "react";
import classes from "./Checkout.module.css";
import CartItem from "./CheckoutItem/CheckoutItem";
import TotalSum from "../Cart/TotalSum/TotalSum";
const checkout = (props) => {
  let cartItems = null;
  if (props.checkout.length) {
    cartItems = (
      <div className={classes.Checkout__Wrapper}>
        <div className={classes.Checkout__Top}>
          <div className=""></div>
          <h2>Checkout</h2>
        </div>
        <div className={classes.Checkout}>
          {props.checkout.map((cart, index) => (
            <CartItem
              name={cart.name}
              price={cart.price}
              img={cart.img}
              qty={cart.qty}
              key={index}
              index={index}
              currency={props.currency}
            />
          ))}
        </div>
        <TotalSum totalSum={props.sumTotal} currency={props.currency} />
        <button onClick={props.continueShop} className={classes.Btn}>
          CONTINUE SHOPPING
        </button>
        <button onClick={props.placeOrder} className={classes.Btn}>
          PLACE ORDER
        </button>
      </div>
    );
  }
  return (
    <div onClick={props.clicked} className={classes.Overlay}>
      {cartItems}
    </div>
  );
};

export default checkout;
