import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
// import classes from "./Header.css";

const styles = {
  Headline: {
    fontSize: "4.2rem",
    fontWeight: "600",
    marginBottom: "10px",
    marginTop: "20px"
  },
  Subheadline: {
    margin: "10px 0 30px",
    fontSize: "1.313rem",
    fontWeight: "400"
  },
  ButtonsWrap: {
    display: "flex",
    flexDirection: "row"
  },
  Button: {
    borderRadius: "30px",
    marginRight: '30px'
  },
};

const Header = props => {
  const { classes } = props;
  return (
    <Grid container spacing={0} style={{ maxWidth: "1260px", margin: "auto" }}>
      <Grid item xs={12}>
        <h1 className={classes.Headline}>BEST CAR 2018</h1>
        <h3 className={classes.Subheadline}>
          React App based on Material Design.
        </h3>
        <div className={classes.ButtonsWrap}>
          <Button
            variant="raised"
            size="large"
            color="secondary"
            classes={{ root: classes.Button }}
          >
            VOTE
          </Button>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            classes={{ root: classes.Button }}
          >
            WINNERS
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Header);
