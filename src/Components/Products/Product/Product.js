import React from "react";
import classes from "./Product.module.css";
const product = (props) => (
  <div className={classes.Product}>
    <div className={classes.Image}>
      <img alt="" src={props.image} className={classes.Product__image} />
    </div>
    <div className={classes.Prod__info__wrapper}>
      <div className={classes.Prod__info__wrapper__top}>
        <h4 className={classes.Product__name}>{props.name}</h4>
      </div>
      <div className={classes.Prod__info__wrapper__bottom}>
        <div className={classes.Input__buttons__wrapper}>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <span className={classes.Product__price}>
          {props.price} {props.currency}
        </span>

        <button
          onClick={props.clicked}
          id={props.index}
          className={classes.Btn}
        >
          Add to cart
        </button>
      </div>
    </div>
  </div>
);

export default product;
