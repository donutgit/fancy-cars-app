import React from "react";
import { withStyles } from "material-ui/styles";

import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import StepperNav from "./StepperNav/StepperNav";
import StepperConent from "./StepperContent/StepperConent";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "relative",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "1664px",
    margin: "auto",
    padding: "0 1rem"
  },
  paper: {
    padding: 16,
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#181C25"
  },
  button: {
    marginRight: theme.spacing.unit
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    color: "#fff"
  }
});

function getSteps() {
  return ["Buisness", "Sport", "Comfort"];
}

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
    choosedCars: {}, 
  };

  totalSteps = () => {
    return getSteps().length;
  };

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepOptional = step => {
    return step === 1;
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }
    const skipped = new Set(this.state.skipped);
    skipped.add(activeStep);
    this.setState({
      activeStep: this.state.activeStep + 1,
      skipped
    });
  };

  skippedSteps() {
    return this.state.skipped.size;
  }

  handleNext = () => {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step
    });
  };

  handleComplete = (carName, step) => {
    // SET CHOOSED CAR
    const stepName = getSteps();
    const currentStep = stepName[step];
    const { choosedCars } = { ...this.state };
    choosedCars[currentStep] = carName;
    this.setState({ choosedCars: choosedCars });
    // SET STEP AS COMPLETED
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed
    });
    console.log('step completed. Chosed cars: ', this.state.choosedCars)
    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    console.log(this.state);
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
              <StepperNav
                activeStep={activeStep}
                steps={steps}
                completed={this.state.completed}
                isStepOptional={this.isStepOptional}
                isStepSkipped={this.isStepSkipped}
                handleStep={this.handleStep}
                isStepComplete={this.isStepComplete}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md>
            <Paper className={classes.paper}>
              <div>
                {this.allStepsCompleted() ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                  </div>
                ) : (
                  <StepperConent
                    activeStep={activeStep}
                    getStepContent={this.getStepContent}
                    handleBack={this.handleBack}
                    handleNext={this.handleNext}
                    isStepOptional={this.isStepOptional}
                    completed={this.state.completed}
                    handleSkip={this.handleSkip}
                    handleComplete={this.handleComplete}
                    completedSteps={this.completedSteps}
                    totalSteps={this.totalSteps}
                    steps={steps}
                  />
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);
