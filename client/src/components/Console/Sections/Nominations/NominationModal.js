import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
//graph
import { Mutation } from "react-apollo";
import { GET_CARS_NOMINATIONS } from "../../../../apollo/queries";
import AuthContext from "../../../../hoc/AuthContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class NominationModal extends React.Component {
  state = {
    nomination: ""
  };

  componentDidMount() {
    const { modalData } = this.props;
    if (modalData.type === "Update" && modalData.nomination) {
      this.setState({
        nomination: modalData.nomination.name
      });
    }
  }

  handleChange = event => {
    this.setState({
      nomination: event.target.value
    });
  };

  onFormSubmit = (event, mutation, role) => {
    event.preventDefault();
    if (role !== "Administrator") {
      console.log("Permission denied")
      return false;
    }
    const { nomination } = this.state;
    const { modalData } = this.props;
    if (modalData.type === "Add") {
      mutation({
        variables: { name: nomination }
      });
      this.props.close();
    } else if (modalData.type === "Update") {
      mutation({
        variables: { id: modalData.nomination.id, name: nomination }
      });
      this.props.close();
    }
  };

  render() {
    // console.log("[MODAL]", this.props, this.state);
    const { classes, modalData } = this.props;
    const { nomination } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.close}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <Typography variant="title" id="modal-title">
            {modalData.type === "Add" ? "Add nomination" : "Edit nomination"}
          </Typography>
          <Mutation
            mutation={modalData.mutation}
            refetchQueries={[{ query: GET_CARS_NOMINATIONS }]}
          >
            {mutation => {
              return (
                <AuthContext.Consumer>
                  {({ user: { role } }) => (
                    <React.Fragment>
                      <form
                        onSubmit={event =>
                          this.onFormSubmit(event, mutation, role)
                        }
                      >
                        <TextField
                          margin="normal"
                          fullWidth
                          id="nomination"
                          label="Enter nomination"
                          type="text"
                          onChange={this.handleChange}
                          value={nomination}
                        />
                      </form>
                      <Button
                        variant="raised"
                        color="primary"
                        type="submit"
                        disabled={nomination ? false : true}
                        fullWidth
                      >
                        {modalData.type === "Add" ? "Add" : "Update"}
                      </Button>
                    </React.Fragment>
                  )}
                </AuthContext.Consumer>
              );
            }}
          </Mutation>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(NominationModal);
