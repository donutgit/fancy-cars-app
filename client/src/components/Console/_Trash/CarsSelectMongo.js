import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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
    selectedCar: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes, cars } = this.props;
    const currentCar = cars[this.state.selectedCar];
    const id = Object.keys(cars);
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
            {cars.map(car => (
              <MenuItem key={i} value={i}>
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
              <span>{currentCar._id}</span>
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
            {currentCar.nominations.map(nom => {
              return (
                <Chip
                  key={nom}
                  label={nom}
                  className={classes.chip}
                  onDelete={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <p>Please select a car</p>
        )}
        <Button variant="raised" color="primary">
          Edit Car Data
        </Button>
        <span>SOON.tm</span>
      </div>
    );
  }
}

export default withStyles(styles)(CarsSelect);
