import React from "react";
import classes from "./Products.module.css";
import Product from "./Product/Product";

const products = (props) => {
  let products = null;
  if (props.products.length) {
    products = (
      <div className={classes.Products}>
        {props.products.map((prod, index) => (
          <Product
            name={prod.name}
            price={prod.price}
            image={prod.image}
            key={index}
            index={index}
            clicked={(event) => props.addToCart(event)}
            currency={props.currency}
          />
        ))}
      </div>
    );
  } else {
    products = <h2 className={classes.h2}>Nothing found</h2>;
  }
  if (props.loading) {
    products = <h2 className={classes.h2}>Nothing found</h2>;
  }
  return <>{products}</>;
};

export default products;
