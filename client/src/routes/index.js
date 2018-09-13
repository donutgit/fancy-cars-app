import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Loadable from "react-loadable";
import compose from "recompose/compose";
//hoc
import withAuthentication from "../hoc/withAuthentication";
import withAppData from "../hoc/withAppData";
import withThemeConfig from "../hoc/withThemeConfig";
//comp
import Spinner from "../components/UI/Spinner/Spinner";
import Button from "@material-ui/core/Button";
import RouteWithLayout from "../hoc/withLayout";

import { isUserAuthenticated } from "../apollo/AuthHelpers";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserAuthenticated() ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// const LoggedOutRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       isUserAuthenticated() ? (
//         <Redirect
//           to={{
//             pathname: "/",
//             state: { from: props.location }
//           }}
//         />
//       ) : (
//         <Component {...props} {...rest} />
//       )
//     }
//   />
// );

// const PropsRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => <Component {...props} {...rest} />} />
// );

const delay = 300;
const loading = props => {
  if (props.error) {
    console.log(props.error)
    return (
      <div>
        Error!{" "}
        <Button variant="raised" color="secondary" onClick={props.retry}>
          Retry
        </Button>
      </div>
    );
  } else if (props.pastDelay) {
    return <Spinner />;
  } else {
    return null;
  }
};
const MainPage = Loadable({
  loader: () => import("./MainPage"),
  loading,
  delay
});
const VotePage = Loadable({
  loader: () => import("./VotePage"),
  loading,
  delay
});
const CarsPage = Loadable({
  loader: () => import("./CarsPage"),
  loading,
  delay
});
const CarLandingPage = Loadable({
  loader: () => import("./CarLandingPage"),
  loading,
  delay
});
const ChartsPage = Loadable({
  loader: () => import("./ChartsPage"),
  loading,
  delay
});
const Auth = Loadable({
  loader: () => import("./Auth"),
  loading,
  delay
});

const Console = Loadable({
  loader: () => import("./Console"),
  loading,
  delay
});

const Routes = () => {
  return (
    <Router>
      <Switch>
        <RouteWithLayout path="/" exact component={MainPage} />
        <RouteWithLayout path="/vote" exact noFooter={true} component={VotePage} />
        <RouteWithLayout path="/cars" exact component={CarsPage} />
        <RouteWithLayout path="/cars/:id" exact component={CarLandingPage} />
        <RouteWithLayout path="/charts" exact component={ChartsPage} />
        <Route path="/join" exact component={Auth} />
        <Route path="/login" exact component={Auth} />
        <PrivateRoute path="/console" component={Console} />
        <Route
          render={() => {
            return <Redirect to="/" />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default compose(
  withThemeConfig,
  withAuthentication,
  withAppData
)(Routes);
