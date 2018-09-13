import React from "react";
import Link from "react-router-dom/Link";
import compose from "recompose/compose";
import withRouter from "react-router-dom/withRouter";
import PropTypes from "prop-types";
//mui
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//icons
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import Settings from "@material-ui/icons/Settings";
import Home from "@material-ui/icons/Home";
//components
import ChartsList from "./ChartsList";
import FirebaseList from "./FirebaseList";
import MongoList from "./MongoList";
import AccountList from "./AccountList";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  homeBtn: {
    backgroundColor: "#F50057",
    borderRadius: "25px",
    marginTop: "20px"
  }
});

class NestedList extends React.Component {
  state = { open: false };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, match } = this.props;

    return (
      <div className={classes.root}>
        <Divider />
        <AccountList />
        <Divider />
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Nested List Items</ListSubheader>
          }
        >
          <Link to={`${match.url}/dashboard`}>
            <ListItem button>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText inset primary="Dashboard" />
            </ListItem>
          </Link>
          <FirebaseList />
          <MongoList />
          <ChartsList />
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </ListItem>
          <Link to="/">
            <ListItem button className={classes.homeBtn}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText inset primary="To App" />
            </ListItem>
          </Link>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(NestedList);
