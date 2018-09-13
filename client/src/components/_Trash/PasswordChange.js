import React, { Component } from "react";
//import { Link } from "react-router-dom";
import { auth } from "../../firebase/index";

const PasswordChangePage = () => (
  <div>
    <h1>Change Password</h1>
    <PasswordChangeForm />
  </div>
);

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class PasswordChangeForm extends Component {
  state = {
    ...INITIAL_STATE
  };

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '300px'}} onSubmit={this.onSubmit}>
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="New Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangePage;

export { PasswordChangeForm };