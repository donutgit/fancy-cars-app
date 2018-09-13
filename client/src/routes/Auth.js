import React, { Component } from "react";
//mui
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
//nodejs
import JoinFrom from "../components/Forms/JoinFromNode";
import LoginForm from "../components/Forms/LoginFormNode";
import { authenticateUser } from "../apollo/AuthHelpers";

import formStyle from "../styles/Auth.module.css";
import AuthContext from "../hoc/AuthContext";

const styles = theme => ({
  root: {
    borderLeft: "5px solid #ed2553",
    marginTop: "8%",
    padding: "0 6%",
    boxSizing: "border-box"
  },
  button: {
    backgroundColor: "#7B04FE",
    width: "100%"
  },
  caption: {
    marginTop: "10px"
  },
  link: {
    color: "#a655ff"
  }
});
class Auth extends Component {
  state = {
    loading: false,
    error: false
  };

  onSubmitJoinFrom = (event, formData, mutate) => {
    this.setState({ loading: true });
    event.preventDefault();
    mutate({
      variables: {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }
    })
      .then(({ data: { login } }) => {
        this.setState({ loading: false });
        this.props.history.push("/login");
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  onSubmitLoginForm = (event, formData, mutate, toggleAuth) => {
    this.setState({ loading: true });
    event.preventDefault();
    mutate({
      variables: {
        email: formData.email,
        password: formData.password
      }
    })
      .then(({ data: { login } }) => {
        console.log(login);
        if (login.ok) {
          authenticateUser(login.token, login.refToken, login.exp);
          toggleAuth();
          this.setState({ loading: false });
          this.props.history.push("/");
        } else {
          console.log(login.errors[0].message);
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { classes, match } = this.props;
    return (
      <div
        className={formStyle.container}
        style={{ backgroundImage: "url(https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536671650/autoroku_assets/bg.png)" }}
      >
        <div className={formStyle.formWrapper}>
          <Typography variant="headline" className={classes.root}>
            {match.url === "/join" ? "Register" : "Login"}
          </Typography>
          {match.url === "/join" ? (
            <JoinFrom
              onSubmit={this.onSubmitJoinFrom}
              loading={this.state.loading}
            />
          ) : (
            <AuthContext.Consumer>
              {({ toggleAuth }) => {
                return (
                  <LoginForm
                    onSubmit={this.onSubmitLoginForm}
                    loading={this.state.loading}
                    toggleAuth={toggleAuth}
                  />
                );
              }}
            </AuthContext.Consumer>
          )}
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Auth);
