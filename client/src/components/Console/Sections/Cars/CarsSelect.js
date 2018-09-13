import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
//comp
import FullScreenDialog from "./FullScreenDialog";
import { REMOVE_CAR, GET_CARS_NOMINATIONS } from "../../../../apollo/queries";
import { Mutation } from "react-apollo";
import AuthContext from "../../../../hoc/AuthContext";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  chip: {
    margin: "5px"
  },
  type: {
    color: "red"
  }
});

class CarsSelect extends Component {
  state = {
    selectedCar: "",
    openForm: false
  };
  openCarDialog = () => {
    this.setState({ openForm: true });
  };

  closeCarDialog = () => {
    this.setState({ openForm: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, cars } = this.props;
    const currentCar = cars[this.state.selectedCar];
    return (
      <div>
        <FormControl className={classes.formControl}>
          <Select
            value={this.state.selectedCar}
            onChange={this.handleChange}
            displayEmpty
            name="selectedCar"
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {cars.map((car, i) => (
              <MenuItem key={car.id} value={i}>
                {car.mark + " " + car.model}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Select a car</FormHelperText>
        </FormControl>
        {currentCar ? (
          <div className={classes.carContainer}>
            <p>
              <span className={classes.type}>ID: </span>
              <span>{currentCar.id || currentCar._id}</span>
            </p>
            <p>
              <span className={classes.type}>Mark: </span>
              <span>{currentCar.mark}</span>
            </p>
            <p>
              <span className={classes.type}>Model: </span>
              <span>{currentCar.model}</span>
            </p>
            <p>
              <span className={classes.type}>Premium: </span>
              <span>{currentCar.premium ? "yes" : "no"}</span>
            </p>
            <p>
              <span className={classes.type}>Votes: </span>
              <span>{currentCar.votes}</span>
            </p>
            <p>
              <span className={classes.type}>Image: </span>
              <img
                height="100"
                src={currentCar.imageUrl}
                alt={currentCar.model}
              />
            </p>
            <span className={classes.type}>Nominations: </span>
            {currentCar.nominations
              ? currentCar.nominations.map(nom => {
                  return (
                    <Chip
                      key={nom}
                      label={nom}
                      className={classes.chip}
                      onDelete={() => {}}
                    />
                  );
                })
              : null}
          </div>
        ) : (
          <p>Please select a car</p>
        )}
        <div>
          <Button
            variant="raised"
            size="small"
            color="primary"
            onClick={this.openCarDialog}
          >
            Add new car
          </Button>
          {currentCar ? (
            <React.Fragment>
              <Button
                variant="raised"
                size="small"
                onClick={this.openCarDialog}
              >
                {`Edit ${currentCar.mark} ${currentCar.model}`}
              </Button>
              <Mutation
                mutation={REMOVE_CAR}
                refetchQueries={[{ query: GET_CARS_NOMINATIONS }]}
              >
                {mutation => (
                  <AuthContext.Consumer>
                    {({ user: { role } }) => (
                      <Button
                        variant="raised"
                        size="small"
                        color="secondary"
                        onClick={
                          role === "Administrator"
                            ? () =>
                                mutation({ variables: { id: currentCar.id } })
                            : null
                        }
                      >
                        {`Remove ${currentCar.mark} ${currentCar.model}`}
                      </Button>
                    )}
                  </AuthContext.Consumer>
                )}
              </Mutation>
            </React.Fragment>
          ) : null}
        </div>
        {this.state.openForm ? (
          <FullScreenDialog
            open={this.state.openForm}
            formData={currentCar}
            onClose={this.closeCarDialog}
          />
        ) : null}
      </div>
    );
  }
}

export default withStyles(styles)(CarsSelect);
