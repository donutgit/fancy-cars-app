import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

class AddNominationModal extends React.Component {
  state = {
    nomination: ""
  };

  handleChange = event => {
    this.setState({
      nomination: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { nomination } = this.state;
    return (
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="title" id="modal-title">
          Add Nomination
        </Typography>
        <form
          onSubmit={event =>
            this.props.onAdd(event, { nomination: nomination })
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
          <Button
            variant="raised"
            color="primary"
            type="submit"
            disabled={nomination ? false : true}
            fullWidth
          >
            Add Nomination
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddNominationModal);
