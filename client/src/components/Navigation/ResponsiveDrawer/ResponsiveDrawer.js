import React from "react";
import NavLink from "react-router-dom/NavLink";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";

import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../../assets/Logo_autoroku_2018.png";
import LoginItems from "../LoginItens/LoginItems";
import AuthContext from "../../../hoc/AuthContext";

const drawerWidth = 240;

const styles = theme => ({
  flex: {
    flex: 1
  },
  appFrame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%"
  },
  appBar: {
    position: "absolute",
    marginLeft: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  header: {
    // backgroundColor: "#12171C",
    backgroundColor: "#14171b",
    height: "52px",
    color: "#ffffff",
    letterSpacing: "1px"
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navDrawerHide: {
    flex: 1,
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "relative",
      height: "100%"
    }
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    padding: theme.spacing.unit * 3,
    height: "calc(100% - 56px)",
    marginTop: 56,
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px)",
      marginTop: 64
    }
  },
  gutters: {
    height: "1px",
    minHeight: "52px"
  },
  Logo: {
    display: "block",
    position: "absolute",
    width: "auto",
    height: "100%",
    top: 0,
    left: 24,
    "& img": {
      display: "block",
      width: "auto",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <React.Fragment>
        <AppBar className={classes.header}>
          <Toolbar className={classes.gutters}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <NavLink to="/" className={classes.Logo}>
              <img src={Logo} alt="Logo" />
            </NavLink>
            <AuthContext.Consumer>
              {({ authenticated }) => (
                <React.Fragment>
                  <NavigationItems type="header" />
                  <LoginItems authenticated={authenticated} />
                </React.Fragment>
              )}
            </AuthContext.Consumer>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <NavigationItems auth={this.context.authUser} type="sidebar" />
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
