import React from "react";
import Link from "react-router-dom/Link";
import compose from "recompose/compose";
import { withRouter } from "react-router";
//mui
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
//icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Settings from "@material-ui/icons/Settings";
//hoc
import AuthContext from "../../../hoc/AuthContext";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class AccountList extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, match } = this.props;
    // console.log(this);
    return (
      <div className={classes.root}>
        <List component="nav">
          <AuthContext.Consumer>
            {({ user }) => {
              return (
                <ListItem button onClick={this.handleClick}>
                  {user && user.imageURL ? (
                    <Avatar aria-label="Avatar" src={user.imageURL} />
                  ) : (
                    <Avatar aria-label="Avatar">A</Avatar>
                  )}
                  <ListItemText
                    inset
                    primary={user ? user.username : "Username"}
                  />
                  {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
              );
            }}
          </AuthContext.Consumer>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to={`${match.url}/profile`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText inset primary="My Profile" />
                </ListItem>
              </Link>
              <Link to={`${match.url}/edit-profile`}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText inset primary="Edit Profile" />
                </ListItem>
              </Link>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText inset primary="Settings" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}
export default compose(
  withStyles(styles),
  withRouter
)(AccountList);
