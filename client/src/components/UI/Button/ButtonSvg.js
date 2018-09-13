import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  SvgWrapper: {
    position: "relative",
    width: "320px",
    height: '60px',
    cursor: 'pointer',
    margin: "auto",
    paddingTop: '28px',
    "&:hover": {
      "& $Shape": {
        strokeWidth: "2px",
        strokeDashoffset: "0",
        strokeDasharray: "760"
      }
    }
  },
  Shape: {
    strokeDasharray: "140 540",
    strokeDashoffset: "-474",
    strokeWidth: "8px",
    fill: "transparent",
    stroke: "#00BCD4",
    borderBottom: "5px solid black",
    transition: "stroke-width 1s, stroke-dashoffset 1s, stroke-dasharray 1s"
  },
  Text: {
    fontSize: "22px",
    lineHeight: "32px",
    letterSpacing: "5px",
    color: "#fff",
    top: "-48px",
    position: "relative",
    textAlign: 'center',
  }
};

const ButtonSvg = props => {
  const { classes } = props;
  return (
    <div className={classes.SvgWrapper}>
      <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
        <rect className={classes.Shape} height="60" width="320" />
      </svg>
      <div className={classes.Text}>{props.children}</div>
    </div>
  );
};

export default withStyles(styles)(ButtonSvg);
