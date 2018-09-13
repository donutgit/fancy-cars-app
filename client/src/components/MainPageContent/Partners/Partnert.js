import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { HeaderUnderline } from "../../../styles/MainPage.module.css";

const styles = {
  PartnersWrap: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: "center",
    padding: '20px 0'
  }
};

const Partners = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <Typography variant="display1" align="left" className={HeaderUnderline}>
        OUR PARTNERS
      </Typography>
      <div className={classes.PartnersWrap}>
        <img src="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672060/autoroku_assets/partners/partners-01.png" alt="Partner-1" />
        <img src="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672060/autoroku_assets/partners/partners-02.png" alt="Partner-2" />
        <img src="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672060/autoroku_assets/partners/partners-03.png" alt="Partner-3" />
        <img src="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672060/autoroku_assets/partners/partners-04.png" alt="Partner-4" />
        <img src="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672060/autoroku_assets/partners/partners-05.png" alt="Partner-5" />
      </div>
    </React.Fragment>
  );
};
export default withStyles(styles)(Partners);
