import React, { Component } from "react";
import Link from "react-router-dom/Link";
import compose from "recompose/compose";
import { withRouter } from "react-router";

//mui
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
//icons
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import ListIcon from "@material-ui/icons/List";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  iconColor: {
    color: "#1C8935"
  }
});

class MongoList extends Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { classes, match } = this.props;
    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <img
              style={{ width: "24px", height: "24px" }}
              src="https://res.cloudinary.com/dxfogjj18/image/upload/v1533807095/icons/mongodb_logo.png"
              alt="Mongodb"
            />
          </ListItemIcon>
          <ListItemText inset primary="Mongodb" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} style={{backgroundColor: "#303030"}} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={`${match.url}/mongo/nominations`}>
              <ListItem button className={classes.nested}>
                <ListItemIcon className={classes.iconColor}>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText inset primary="Nominations" />
              </ListItem>
            </Link>
            <Link to={`${match.url}/mongo/cars`}>
              <ListItem button className={classes.nested}>
                <ListItemIcon className={classes.iconColor}>
                  <DirectionsCar />
                </ListItemIcon>
                <ListItemText inset primary="Cars" />
              </ListItem>
            </Link>
            <Link to={`${match.url}/mongo/users`}>
              <ListItem button className={classes.nested}>
                <ListItemIcon className={classes.iconColor}>
                  <SupervisorAccount />
                </ListItemIcon>
                <ListItemText inset primary="Users" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(MongoList);