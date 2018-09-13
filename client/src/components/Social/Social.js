import React from "react";
import FontAwesome from "react-fontawesome";
//mui
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  Social: {
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box"
  },
  IconColor: {
    color: "rgba(255, 255, 255, 0.5)",
    transition: ".3s",
    "&:hover[aria-label='Facebook']": {
      color: "#3B5998"
    },
    "&:hover[aria-label='Google Plus']": {
      color: "#dd4b39"
    },
    "&:hover[aria-label='Twitter']": {
      color: "#00aced"
    },
    "&:hover[aria-label='LinkedIn']": {
      color: "#225982"
    }
  }
};

const Social = props => {
  const { classes } = props;

  return (
    <div className={classes.Social}>
      <IconButton aria-label="Facebook" classes={{ root: classes.IconColor }}>
        <FontAwesome name="facebook-f" />
      </IconButton>
      <IconButton
        aria-label="Google Plus"
        classes={{ root: classes.IconColor }}
      >
        <FontAwesome name="google-plus" />
      </IconButton>
      <IconButton aria-label="Twitter" classes={{ root: classes.IconColor }}>
        <FontAwesome name="twitter" />
      </IconButton>
      <IconButton aria-label="LinkedIn" classes={{ root: classes.IconColor }}>
        <FontAwesome name="linkedin" />
      </IconButton>
    </div>
  );
};
export default withStyles(styles)(Social);
