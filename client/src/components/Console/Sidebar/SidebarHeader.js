import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  sidedarHeader: {
    display: "flex",
    alignItems: "center",
    padding: "15px 0"
  },
  logo: {
    height: "30px",
    margin: "0 10px"
  },
  text: {
    textTransform: "uppercase"
  }
});

const SidebarHeader = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.sidedarHeader}>
        <img
          className={classes.logo}
          src="https://res.cloudinary.com/dxfogjj18/image/upload/v1533807100/icons/react_logo.png"
          alt="Logo"
        />
        <Typography
          variant="headline"
          color="inherit"
          className={classes.text}
          noWrap
        >
          Console
        </Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(SidebarHeader);
