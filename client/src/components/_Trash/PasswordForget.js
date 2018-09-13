import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/index";

const PasswordForgetPage = () => (
  <div>
    <h1>Forget Password</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class PasswordForgetForm extends Component {
  state = {
    ...INITIAL_STATE
  };

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        console.log('[password was reseted]')
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '300px'}} onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}
const PasswordForgetLink = () =>
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };