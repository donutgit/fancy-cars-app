import React from "react";
import AuthContext from "./AuthContext.js";
import {
  isUserAuthenticated,
  deauthenticateUser,
  getAccessToken
} from "../apollo/AuthHelpers";
import decode from "jwt-decode";

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    state = {
      authenticated: false,
      user: null
    };

    componentDidMount() {
      // get user data if user authenticated
      this.toggleAuthenticateStatus();
    }

    toggleAuthenticateStatus = () => {
      // check authenticated status and toggle state based on that
      if (isUserAuthenticated()) {
        const user = decode(getAccessToken());
        this.setState({ authenticated: true, user: user });
      } else {
        // client.query({ query: GET_USERS }).then(res => console.log(res));
        this.setState({ authenticated: false });
      }
    };

    onLogout = () => {
      deauthenticateUser();
      this.toggleAuthenticateStatus();
    };

    render() {
      console.log(
        `[User --=${
          this.state.authenticated ? "IS" : "IS NOT"
        }=-- authenticated]`
      );
      return (
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            user: this.state.user,
            toggleAuth: this.toggleAuthenticateStatus,
            onLogout: this.onLogout
          }}
        >
          <Component />
        </AuthContext.Provider>
      );
    }
  };

export default withAuthentication;
