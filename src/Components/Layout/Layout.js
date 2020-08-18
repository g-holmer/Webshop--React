import React from "react";
import classes from "./Layout.module.css";
const layout = (props) => (
  <div className={classes.Layout}>
    <header className={classes.Header}>
      <div className={classes.Logo}></div>
      <input
        onChange={props.changed}
        placeholder="Search..."
        className={classes.Search}
        type="text"
      />

      <div onClick={props.clicked} className={classes.Cart}>
        {props.cartCounter}
      </div>
    </header>
    <main className={classes.Main}>{props.children}</main>
    <footer className={classes.Footer}>
      <div className={classes.Logo}></div>
      <div className={classes.Support}>
        <p className={classes.FooterText}>
          Copyright @ 2020 Stockholm Sweden, Inc. All rights reserved.{" "}
          <a className={classes.Footer__Links} href="http://">Terms of Use</a> |{" "}
          <a className={classes.Footer__Links} href="http://">Privacy Policy - REVISED</a>
        </p>
      </div>
    </footer>
  </div>
);

export default layout;
