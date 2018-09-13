import React from "react";
import Scrollchor from "react-scrollchor";
import classes from "./CarPoolNavigation.module.css";

const CarPollNavigation = props => {
  const { label, hash } = props.nav;
  return (
    <ul className={classes.CarPoolNav}>
      {label.map((item, index) => {
        return (
          <li key={item}>
            <Scrollchor to={`#${hash[index]}`}>{item}</Scrollchor>
          </li>
        );
      })}
    </ul>
  );
};

export default CarPollNavigation;
