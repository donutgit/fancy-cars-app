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
import ShowChart from "@material-ui/icons/ShowChart";
import ViewList from "@material-ui/icons/ViewList";
import InsertChart from "@material-ui/icons/InsertChart";

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

class ChartsList extends Component {
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
            <InsertChart />
          </ListItemIcon>
          <ListItemText inset primary="Charts" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} style={{backgroundColor: "#303030"}} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link to={`${match.url}/vote-charts`}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ShowChart />
                </ListItemIcon>
                <ListItemText inset primary="Vote Charts" />
              </ListItem>
            </Link>
            <Link to={`${match.url}/vote-list`}>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                <ListItemText inset primary="Vote List" />
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
)(ChartsList);
