import React from "react";
import AuthUserContext from "./AuthUserContext";
import { auth, dbStore } from "../firebase/firebase";

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    state = {
      authUser: null,
      userProfile: null
    };

    componentDidMount() {
      auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }
    componentDidUpdate(prevProps, prevState) {
      if (this.state.authUser !== prevState.authUser) {
        this.state.authUser
          ? dbStore
              .collection("userbase")
              .doc("users")
              .onSnapshot(
                doc => {
                  if (doc.exists) {
                    const userProfile = doc.data()[this.state.authUser.uid];
                    this.setState({ userProfile });
                  } else console.log("doc doesnt exist");
                },
                error => console.log("error getting snapshot", error)
              )
          : this.setState({ userProfile: null });
      }
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
