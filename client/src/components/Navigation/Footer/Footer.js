import React from "react";
//mui
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
//icons
import Phone from "@material-ui/icons/Phone";
import Email from "@material-ui/icons/Email";
import LocationOn from "@material-ui/icons/LocationOn";

import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Footer.module.css";
const Footer = props => {
  return (
    <footer className={classes.FooterContainer}>
      <div className={classes.FooterContent}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <NavigationItems type="footer" />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.Rights}>
              <p>© 2018, Coded by Fancy Pants.</p>
            </div>
          </Grid>
          <Grid item md={6} sm={12}>
            <div className={classes.IconsContainer}>
              <div className={classes.IconWrap}>
                <Phone />
                <p>(044) 555-55-55</p>
              </div>
              <div className={classes.IconWrap}>
                <Email />
                <p>john@doe.com</p>
              </div>
              <div className={classes.IconWrap}>
                <LocationOn />
                <p>Ukraine, 012345, Kiev</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
