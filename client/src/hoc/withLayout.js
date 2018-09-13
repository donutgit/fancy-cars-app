import React from "react";
import { Route } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

import ResponsiveDrawer from "../components/Navigation/ResponsiveDrawer/ResponsiveDrawer";
import Footer from "../components/Navigation/Footer/Footer";

const style = {
  Layout: {
    marginTop: "52px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center top",
    flex: "1 0 auto"
  }
};
const Layout = ({ component: Component, noFooter, classes, ...props }) => {
  return (
    <Route
      {...props}
      render={matchProps => {
        return (
          <React.Fragment>
            <ResponsiveDrawer />
            <main
              className={classes.Layout}
              style={{ backgroundImage: "https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536671663/autoroku_assets/bg_l.png" }}
            >
              <Component {...matchProps} />
            </main>
            {noFooter || <Footer />}
          </React.Fragment>
        );
      }}
    />
  );
};

export default withStyles(style)(Layout);
