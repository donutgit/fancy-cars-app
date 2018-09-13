import React from "react";
import IconButton from "material-ui/IconButton";
import AddCircleOutlineIcon from "material-ui-icons/AddCircleOutline";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  AddCar: {
    width: "100%",
    minHeight: "354px",
    border: "3px solid #5b5b5b",
    borderRadius: "3px",
    maxWidth: "345px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
})

const EmptyCard = props => {
  return (
  <div className={props.classes.AddCar}>
    <IconButton
      style={{width: "100%", height: "100%"}}
      aria-label="Add"
      onClick={props.open}
      color="primary"
    >
      <AddCircleOutlineIcon style={{fontSize: "80px"}} />
    </IconButton>
  </div>
)};

export default withStyles(styles)(EmptyCard);
