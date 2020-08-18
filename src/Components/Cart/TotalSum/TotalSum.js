import React from "react";
import classes from './TotalSum.module.css'
const totalSum = (props) => (
  <div className={classes.TotalSum}>Total: {props.totalSum} {props.currency}</div>
);

export default totalSum;
