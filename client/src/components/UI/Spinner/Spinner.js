import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";

const style = {
  LoadingCircle: {
    position: "absolute",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#00BCD4"
  }
};

const Spinner = props => (
  <div className={props.classes.LoadingCircle}>
    <CircularProgress color="inherit" size={100} />
  </div>
);

export default withStyles(style)(Spinner);
