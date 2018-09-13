import React from "react";
import { Route, withRouter } from "react-router-dom";
import compose from "recompose/compose";
//mui
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
//SIDEBAR
import SidebarHeader from "./Sidebar/SidebarHeader";
import SidebarList from "./Sidebar/SidebarList";
//SECTIONS
import Dashboard from "./Sections/Dashboard/Dashboard";
// import EditProfile from "./Sections/Profile/EditProfile";
import Profile from "./Sections/Profile/Profile";
import Nominations from "./Sections/Nominations/Nominations";
import Cars from "./Sections/Cars/Cars";
import Users from "./Sections/Users/Users";
import VoteList from "./Sections/VoteList/VoteList";
import VoteCharts from "./Sections/VoteCharts/VoteCharts";
//STYLES
import styles from "./ConsoleRoot.jsx";

class ConsoleDrawer extends React.PureComponent {
  state = {
    anchor: "left"
  };

  render() {
    // console.log(this.state);
    const { classes, match } = this.props;
    const { anchor } = this.state;
    // console.log(this.user.getToken());
    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-left`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            anchor={anchor}
          >
            <div className={classes.drawerContent}>
              <SidebarHeader />
              <SidebarList />
            </div>
          </Drawer>
          <main className={classes.content}>
            <Route path={`${match.url}/profile`} component={Profile} />
            {/* <Route
              path={`${match.url}/edit-profile`}
              render={props => (
                <EditProfile
                  user={this.props.user}
                  profile={this.props.profile}
                  {...props}
                />
              )}
            /> */}
            <Route
              path={`${match.url}/mongo/nominations`}
              component={Nominations}
            />
            <Route path={`${match.url}/mongo/cars`} component={Cars} />
            <Route path={`${match.url}/mongo/users`} component={Users} />
            <Route path={`${match.url}/vote-charts`} component={VoteCharts} />
            <Route path={`${match.url}/vote-list`} component={VoteList} />
            <Route exact path={match.url} component={Dashboard} />
          </main>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(ConsoleDrawer);
