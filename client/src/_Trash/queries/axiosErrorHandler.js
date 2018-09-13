import React, { Component } from "react";
import Snackbar from "../components/UI/Snackbar/Snackbar";

const errorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <React.Fragment>
          <Snackbar
            show={this.state.error}
            message={this.state.error ? this.state.error.message : null}
            modalClosed={this.errorConfirmedHandler}
          />
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};
export default errorHandler;
