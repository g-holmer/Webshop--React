import React from "react";
import classes from "./Cart.module.css";
import CartItem from "./CartItem/CartItem";
import TotalSum from "./TotalSum/TotalSum";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import styled from "styled-components";
const StyledGrid = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-color: rgb(0, 0, 0) rgb(255, 255, 255);
  scrollbar-width: thick;
  overflow-x: hidden;
  max-height: 500px;

  .transition-enter {
    opacity: 0.01;
    transform: translate(0, -10px);
  }
  .transition-enter-active {
    opacity: 1;
    transform: translate(0, 0);
    transition: all 300ms ease-in;
  }
  .transition-exit {
    opacity: 1;
    transform: translate(0, 0);
  }
  .transition-exit-active {
    opacity: 0.01;
    transform: translate(0, 10px);
    transition: all 300ms ease-in;
  }
`;
const cart = (props) => {
  let cartItems = null;
  if (props.cart.length) {
    cartItems = (
      <div className={classes.Cart__Wrapper}>
        <div className={classes.Cart__Top}>
          <div className=""></div>
          <h2>Cart</h2>
          <div
            id="closeBtn"
            onClick={props.clicked}
            className={classes.Cart__Close}
          >
            <span id="closeBtn" className={classes.CloseSpan1}>
              <span id="closeBtn" className={classes.CloseSpan2}></span>
            </span>
          </div>
        </div>

        <TransitionGroup component={StyledGrid}>
          {props.cart.map((cart, index) => (
            <CSSTransition
              key={cart.name}
              timeout={300}
              classNames="transition"
            >
              <CartItem
                name={cart.name}
                price={cart.price}
                img={cart.img}
                qty={cart.qty}
                key={index}
                index={index}
                currency={props.currency}
                clicked={() => props.delete(index, cart.name)}
                addQty={() => props.addQty(index)}
                removeQty={() => props.removeQty(index)}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>

        <TotalSum totalSum={props.sumTotal} currency={props.currency} />
        <button onClick={props.checkout} className={classes.OrderBtn}>
          PROCEED TO CHECKOUT
        </button>
      </div>
    );
  } else {
    cartItems = (
      <div className={classes.Cart__Wrapper}>
        <div className={classes.NoItems}>No items in cart</div>
      </div>
    );
  }
  return (
    <div id="Overlay" onClick={props.clicked} className={classes.Overlay}>
      {cartItems}
    </div>
  );
};

export default cart;
