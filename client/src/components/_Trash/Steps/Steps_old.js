import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepButton } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import CarCard from "../CarCard/CarCard";
import axios from "axios";
import Spinner from "../UI/Spinner/Spinner";
import StepperNav from "./StepperNav/StepperNav";
import StepperConent from "./StepperContent/StepperConent";

//import StepperNav from "./StepperNav/StepperNav";

const styles = theme => ({
  root: {
    width: "100%"
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
  },
  carCard: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gridAutoRows: "minmax(100px, auto)",
    gridGap: "15px",
    justifyItems: "center"
  }
});

function getSteps() {
  return ["Buisness", "Sport", "Comfort"];
}

const postLink = "http://localhost/wordpress/wp-json/wp/v2";

class HorizontalNonLinearAlternativeLabelStepper extends React.Component {
  state = {
    activeStep: 0,
    completed: new Set(),
    skipped: new Set(),
    allCars: {},
    choosedCars: {},
    error: true
  };

  componentDidMount() {
    // buisness 8
    // sport 9
    // compact 10
    let allCars = [];
    axios.get(postLink + "/posts?categories=8").then(response => {
      allCars.push(response.data);
      return axios.get(postLink + "/posts?categories=9").then(response => {
        allCars.push(response.data);
        return axios.get(postLink + "/posts?categories=10").then(response => {
          allCars.push(response.data);
          this.setState({ allCars });
          this.setState({ error: false });
        });
      });
    });
  }
  chooseCarHandler = (carName, step) => {
    const stepName = getSteps();
    const currentStep = stepName[step];
    const { choosedCars } = { ...this.state };
    choosedCars[currentStep] = carName;
    // console.log("edit choosedCars", choosedCars);
    this.setState({ choosedCars: choosedCars });
  };

  getStepContent(step) {
    let cars = <Spinner />;
    if (!this.state.error) {
      cars = this.state.allCars[step].map(car => {
        return (
          <CarCard
            key={car.id}
            title={car.acf.title}
            description={car.acf.description}
            image={car.acf.image}
            step={step}
            clicked={this.chooseCarHandler}
          />
        );
      });
    }

    switch (step) {
      case 0:
        return cars;
      case 1:
        return cars;
      case 2:
        return cars;
      default:
        return "Unknown step";
    }
  }

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

  handleComplete = () => {
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed
    });
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
        <StepperNav
          activeStep={activeStep}
          steps={steps}
          completed={this.state.completed}
          isStepOptional={this.isStepOptional}
          isStepSkipped={this.isStepSkipped}
          handleStep={this.handleStep}
          isStepComplete={this.isStepComplete}
        />
        {/* <Stepper alternativeLabel nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const buttonProps = {};
            if (this.isStepOptional(index)) {
              buttonProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (this.isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.isStepComplete(index)}
                  {...buttonProps}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper> */}
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&quot;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : 
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
          
          // (
          //   <div>
          //     <div className={classes.carCard}>
          //       {this.getStepContent(activeStep)}
          //     </div>
          //     <div>
          //       <Button
          //         variant="raised"
          //         disabled={activeStep === 0}
          //         color="secondary"
          //         onClick={this.handleBack}
          //         className={classes.button}
          //       >
          //         Back
          //       </Button>
          //       <Button
          //         variant="raised"
          //         color="primary"
          //         onClick={this.handleNext}
          //         className={classes.button}
          //       >
          //         Next
          //       </Button>
          //       {this.isStepOptional(activeStep) &&
          //         !this.state.completed.has(this.state.activeStep) && (
          //           <Button
          //             variant="raised"
          //             color="secondary"
          //             onClick={this.handleSkip}
          //             className={classes.button}
          //           >
          //             Skip
          //           </Button>
          //         )}
          //       {activeStep !== steps.length &&
          //         (this.state.completed.has(this.state.activeStep) ? (
          //           <Typography variant="caption" className={classes.completed}>
          //             Step {activeStep + 1} already completed
          //           </Typography>
          //         ) : (
          //           <Button
          //             variant="raised"
          //             color="primary"
          //             onClick={this.handleComplete}
          //           >
          //             {this.completedSteps() === this.totalSteps() - 1
          //               ? "Finish"
          //               : "Complete Step"}
          //           </Button>
          //         ))}
          //     </div>
          //   </div>
          // )
          }
        </div>
      </div>
    );
  }
}

HorizontalNonLinearAlternativeLabelStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalNonLinearAlternativeLabelStepper);
