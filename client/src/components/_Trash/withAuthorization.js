import React from "react";
import { withRouter } from "react-router-dom";
import { firebase } from "../firebase";
import AppUserContext from "../hoc/AuthUserContext";

const withAuthorization = authCondition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push("/login");
        }
      });
    }

    render() {
      return (
        <AppUserContext.Consumer>
          {authUser => (authUser ? <Component /> : null)}
        </AppUserContext.Consumer>
      );
    }
  }
  // withRouter для того чтобы сделать push("/login")
  return withRouter(WithAuthorization);
};

export default withAuthorization;
