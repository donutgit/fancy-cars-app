import React from "react";
import AuthContext from "../../hoc/AuthContext";
import Button from "@material-ui/core/Button";

const SignOutButton = () => (
  <AuthContext.Consumer>
    {({ onLogout }) => {
      return (
        <Button fullWidth={true} color="secondary" onClick={() => onLogout()}>
          Sign Out
        </Button>
      );
    }}
  </AuthContext.Consumer>
);

export default SignOutButton;
