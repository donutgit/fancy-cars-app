import React, { Component } from "react";
import { withFormik } from "formik";
import { object, string, number } from "yup";
//mui
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import classes from "./FormStyles.module.css";
import { DisplayFormikState } from "./helper";
//apollo
import { Mutation } from "react-apollo";
import { ADD_VOTE } from "../../apollo/queries";

// Our inner form component. Will be wrapped with Formik({..})
class MyInnerForm extends Component {
  state = {
    loading: false
  };

  submitFormHandler = (event, mutate) => {
    event.preventDefault();
    this.setState({ loading: true });
    const data = {
      name: this.props.values.name,
      email: this.props.values.email,
      phone: this.props.values.phone,
      voteResult: JSON.stringify(this.props.choosedCars)
      // voteResult: JSON.stringify({kappa: "pride", jebaited: "kuk"})
    };

    mutate({ variables: data }).then(res => {
      console.log(res);
      this.setState({ loading: false });
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      //dirty,
      //isSubmitting,
      handleChange,
      handleBlur
      //handleReset
    } = this.props;

    return (
      <div className={classes.formWrapper}>
        <h3 style={{ textAlign: "center" }}>
          All steps completed! Submit form to finish vote
        </h3>
        <Mutation mutation={ADD_VOTE}>
          {mutate => (
            <form
              onSubmit={event => this.submitFormHandler(event, mutate)}
              className={this.state.loading ? classes.loading : null}
            >
              <TextField
                margin="normal"
                error={errors.name && touched.name ? true : false}
                id="name"
                label="Enter your name"
                type="text"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.name && touched.name ? "Error" : null}
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
                helperText={errors.email && touched.email ? "Error" : null}
              />
              <TextField
                margin="normal"
                error={errors.phone && touched.phone ? true : false}
                id="phone"
                label="Enter your phone"
                type="number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.phone && touched.phone ? "Error" : null}
              />
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <Button
                  variant="raised"
                  color="primary"
                  onClick={this.props.voteReset}
                >
                  Reset Vote
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  type="submit"
                  disabled={!this.props.isValid}
                >
                  Submit
                </Button>
              </div>
              <DisplayFormikState {...this.props} />
            </form>
          )}
        </Mutation>
        {this.state.loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} color="secondary" />
          </div>
        ) : null}
      </div>
    );
  }
}

const SendVoteForm = withFormik({
  mapPropsToValues: () => ({
    email: "email@gmail.com",
    name: "Dmitry",
    phone: "322322322322"
  }),
  validationSchema: object().shape({
    email: string()
      .email("Invalid email address")
      .required("Email is required!"),
    name: string()
      .min(5, "min 5 characters")
      .required("name is req"),
    phone: number()
      .min(9999999999, "min 11 char")
      .required("enter valid phone")
  }),
  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },
  displayName: "BasicForm" // helps with React DevTools
})(MyInnerForm);

export default SendVoteForm;
