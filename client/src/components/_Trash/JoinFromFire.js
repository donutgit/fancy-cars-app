import React, { PureComponent } from "react";
import Link from "react-router-dom/Link";
import { withFormik } from "formik";
import Yup from "yup";
//mui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import classes from "./FormStyles.css";

// Our inner form component. Will be wrapped with Formik({..})
class MyInnerForm extends PureComponent {
  render() {
    const {
      values,
      touched,
      errors,
      //dirty,
      //isSubmitting,
      handleChange,
      handleBlur
      //handleSubmit
      //handleReset
    } = this.props;

    const formData = this.props.values;
    let form = (
      <form
        onSubmit={event => this.props.onSubmit(event, formData)}
        className={this.props.loading ? classes.loading : null}
      >
        <TextField
          margin="normal"
          error={errors.username && touched.username ? true : false}
          id="username"
          label="Username"
          type="text"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.username && touched.username ? errors.username : null
          }
        />
        <TextField
          margin="normal"
          error={errors.email && touched.email ? true : false}
          id="email"
          label="Enter your email"
          type="text"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={errors.email && touched.email ? errors.email : null}
        />
        <TextField
          margin="normal"
          error={errors.password && touched.password ? true : false}
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.password && touched.password ? errors.password : null
          }
        />
        <TextField
          margin="normal"
          error={
            errors.passwordConfirm && touched.passwordConfirm ? true : false
          }
          id="passwordConfirm"
          label="Confirm Password"
          type="password"
          value={values.passwordConfirm}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={
            errors.passwordConfirm && touched.passwordConfirm
              ? errors.passwordConfirm
              : null
          }
        />
        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={!this.props.isValid}
          fullWidth
        >
          Register
        </Button>
        <Typography variant="caption">
          Already have an account? <Link to="/login">Sign In</Link>
        </Typography>
      </form>
    );
    // if(this.props.loading) {
    //   form = <CircularProgress size={50} color="secondary" />;
    // }s

    return (
      <div>
        {form}
        {this.props.loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} color="secondary" />
          </div>
        ) : null}
      </div>
    );
  }
}

// валидация паролей
function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: "equalTo",
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path
    },
    test: function(value) {
      return value === this.resolve(ref);
    }
  });
}
Yup.addMethod(Yup.string, "equalTo", equalTo);

const JoinForm = withFormik({
  mapPropsToValues: () => ({
    email: "",
    username: "",
    password: "",
    passwordConfirm: ""
  }),
  validationSchema: Yup.object().shape({
    username: Yup.string().required("You can't leave this empty."),
    email: Yup.string()
      .email("Invalid email address")
      .required("You can't leave this empty."),
    password: Yup.string()
      .min(8, "Your password must be at least 8 characters long")
      .required("You can't leave this empty."),
    passwordConfirm: Yup.string()
      .equalTo(Yup.ref("password"), "These passwords don't match. Try again?")
      .required("You can't leave this empty.")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
})(MyInnerForm);

export default JoinForm;
