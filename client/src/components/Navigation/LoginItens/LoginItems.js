import React, { Component } from "react";
//mui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
import ButtonBase from "@material-ui/core/ButtonBase";
import PersonOutline from "@material-ui/icons/PersonOutline";
import NavigationItem from "../NavigationItems/NavigationItem/NavigationItem";
import SignOutButton from "../../Forms/SignOut";
import classes from "./LoginItems.module.css";
import Link from "react-router-dom/Link";

class LoginItems extends Component {
  state = {
    anchorEl: null
  };
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    // console.log(this.props.auth);
    const { anchorEl } = this.state;
    const { authenticated } = this.props;
    return (
      <ul className={classes.Login}>
        {authenticated ? (
          <React.Fragment>
            <ButtonBase
              aria-owns={anchorEl ? "simple-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <PersonOutline />
            </ButtonBase>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <MenuItem
                to="/console/edit-profile"
                onClick={this.handleClose}
                color="inherit"
                component={Link}
              >
                Edit Profile
              </MenuItem>
              <MenuItem
                to="/console"
                onClick={this.handleClose}
                color="inherit"
                component={Link}
              >
                Console
              </MenuItem>
              <SignOutButton />
            </Menu>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavigationItem link="/join">Sign Up</NavigationItem>
            <NavigationItem link="/login">Sign In</NavigationItem>
          </React.Fragment>
        )}
      </ul>
    );
  }
}

export default LoginItems;
