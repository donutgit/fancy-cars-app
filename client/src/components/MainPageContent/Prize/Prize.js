import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import classes from "./Prize.module.css";

class Prize extends Component {
  render() {
    return (
      <div className={classes.PrizeWrap}>
        <Typography variant="display1">
          Vote for best car of 2018 and won prizes from our partners
        </Typography>
        <Button variant="raised" color="primary">
          Vote
        </Button>
      </div>
    );
  }
}

export default Prize;
