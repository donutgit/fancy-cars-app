import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
// import SignOutButton from "../../Authorization/SignOut";

const NavigationItems = props => (
  <ul
    className={props.type === "header" ? classes.HeaderNav : classes.FooterNav}
  >
    <NavigationItem link="/">Main Page</NavigationItem>
    <NavigationItem link="/vote">Vote</NavigationItem>
    <NavigationItem link="/cars">Cars</NavigationItem>
    <NavigationItem link="/charts">Charts</NavigationItem>
    <NavigationItem link="/console" color="#F50057">Console</NavigationItem>
  </ul>
);

export default NavigationItems;
