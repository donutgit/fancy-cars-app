import React from "react";
import AppDataContext from "../hoc/AppDataContext";
import Transition from "react-transition-group/Transition";

//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import LinearProgress from "@material-ui/core/LinearProgress";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
//icons
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Flag from "@material-ui/icons/Flag";
//my components
import CarCard from "../components/CarCard/CarCard";
import Social from "../components/Social/Social";
import SendVoteForm from "../components/Forms/SendVoteForm";
import StepLabel from "@material-ui/core/StepLabel";
//styles
import reactLogo from "../assets/react_logo.png";
import MainBg from "../assets/bg_l.png";
import VotePageStyles from "../styles/VotePageStyles";

const transitionStyles = {
  entering: { opacity: 0, transform: "translateX(21px)" },
  entered: { opacity: 1, transform: "translateX(0)" }
};

const stepsList = {
  label: [
    "Small Class",
    "Economy",
    "Compact",
    "Buisness",
    "Lux",
    "Coupe / Sport",
    "Electric / Hybrid",
    "Crossover",
    "SUV",
    "Design",
    "Price / Quality",
    "Best Crossover / SUV 2018",
    "Best Car 2018"
  ],
  hash: [
    "small-class",
    "economy",
    "compact",
    "buisness",
    "lux",
    "coupe-sport",
    "electric-hybrid",
    "crossover",
    "suv",
    "design",
    "price-quality",
    "best-crossover-or-suv-2018",
    "best-car-2018"
  ]
};

class VotePage extends React.PureComponent {
  state = {
    activeStep: 0,
    progress: 0,
    completed: new Set(),
    skipped: new Set(),
    choosedCars: {}
  };

  getSteps = (type = "label") => {
    // return this.state.nominations;
    return stepsList[type];
  };
  totalSteps = () => {
    return this.getSteps().length;
  };

  isStepComplete(step) {
    return this.state.completed.has(step);
  }

  completedSteps() {
    return this.state.completed.size;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps() - this.skippedSteps();
    // return true;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepOptional = step => {
    // return step === 1;
    return;
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
    // FOR SCROLL TO STEP FUNC
    // const hash = this.getSteps("hash");

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed

      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
      // this.props.history.push("/vote#" + hash[activeStep]);
      //SCROLL TO STEP
      // !this.allStepsCompleted()
      //   ? document.getElementById(hash[activeStep]).scrollIntoView()
      //   : null;
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

  handleComplete = (mark, model, step) => {
    // SET CHOOSED CAR
    const carName = mark + " " + model;
    const stepName = this.getSteps();
    const currentStep = stepName[step];
    const { choosedCars } = { ...this.state };
    choosedCars[currentStep] = carName;
    // SET STEP AS COMPLETED
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    const progress = Math.floor((completed.size / this.totalSteps()) * 100);
    this.setState({
      completed,
      choosedCars,
      progress
    });

    // console.log("step completed. Chosed cars: ", this.state.choosedCars);
    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    // if (completed.size !== this.totalSteps() - this.skippedSteps()) {
    //   this.handleNext();
    // }
  };
  isCarSelected = () => {
    return;
  };

  voteReset = () => {
    this.setState({
      activeStep: 0,
      progress: 0,
      completed: new Set(),
      skipped: new Set(),
      choosedCars: {}
    });
  };

  carInfoHandler = (id, data) => {
    this.props.history.push({
      pathname: `/vote/${id}`,
      data
    });
  };
  currentNomination = () => {
    const nom = this.getSteps();
    const step = this.state.activeStep;
    return nom[step];
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const hash = this.getSteps("hash");
    const { activeStep } = this.state;
    return (
      <div className={classes.Root}>
        {/* NAVIGATION */}
        <div className={classes.NavigationWrap}>
          <h3 className={classes.SidebarTitle}>Nominations</h3>
          <Stepper
            classes={{ root: classes.Stepper }}
            nonLinear
            connector={null}
            orientation="vertical"
            activeStep={activeStep}
          >
            {steps.map((label, index) => {
              const stepProps = {};
              if (() => this.isStepSkipped(index)) {
                stepProps.completed = false;
              }
              const completed = this.state.completed.has(index);

              return (
                <Step
                  key={label}
                  {...stepProps}
                  id={hash[index]}
                  className={[
                    classes.StepRoot,
                    activeStep === index ? classes.ActiveStep : null,
                    completed ? classes.CompletedStep : null
                  ].join(" ")}
                >
                  <StepButton
                    classes={{ root: classes.StepButton }}
                    onClick={this.handleStep(index)}
                    completed={completed}
                  >
                    <StepLabel
                      classes={{
                        iconContainer: classes.StepIcon,
                        label: classes.StepLabel
                      }}
                    >
                      <div
                        className={[
                          classes.textEllipsis,
                          classes.sidebarNavItemText
                        ].join(" ")}
                      >
                        <span className="textEllipsis">{label}</span>
                        <span className="textEllipsis active">
                          {this.state.choosedCars[label]}
                        </span>
                      </div>
                    </StepLabel>
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          <div className={classes.Social}>
            <h3 className={classes.SidebarTitle}>Social</h3>
            <Social />
          </div>
          <Divider />
          <div className={classes.ReactLogo}>
            <img src={reactLogo} alt="React Logo" />
          </div>
        </div>
        {/* VOTE */}
        <div
          className={classes.MainWrap}
          style={{ backgroundImage: `url(${MainBg})` }}
        >
          {this.allStepsCompleted() ? (
            <SendVoteForm
              voteReset={this.voteReset}
              choosedCars={this.state.choosedCars}
            />
          ) : (
            <AppDataContext.Consumer>
              {data => {
                const currentNomination = this.currentNomination();
                const NominationCars = data.poll[currentNomination];
                return (
                  <div className={classes.nominations}>
                    {NominationCars.map(car => {
                      return (
                        <Transition
                          in={true}
                          appear={true}
                          timeout={200}
                          key={car.id}
                        >
                          {state => {
                            return (
                              <div
                                style={{
                                  transition: `all 300ms ease-in-out`,
                                  transform: "translateX(25px)",
                                  opacity: 0,
                                  ...transitionStyles[state]
                                }}
                              >
                                <CarCard
                                  car={car}
                                  step={activeStep}
                                  selected={
                                    this.state.choosedCars[
                                      currentNomination
                                    ] ===
                                    car.mark + " " + car.model
                                  }
                                  handleComplete={this.handleComplete}
                                  carInfoHandler={this.carInfoHandler}
                                />
                              </div>
                            );
                          }}
                        </Transition>
                      );
                    })}
                  </div>
                );
              }}
            </AppDataContext.Consumer>
          )}
          {/* CONTROLLS */}
          <div className={classes.controls}>
            <div className={classes.controlButtons}>
              <Button
                disabled={activeStep === 0 || this.allStepsCompleted()}
                color="inherit"
                onClick={this.handleBack}
              >
                <ArrowBack style={{ fontSize: 42 }} />
              </Button>
              {activeStep !== steps.length && (
                <div className={classes.choosedCar}>
                  {!this.allStepsCompleted() ? (
                    <React.Fragment>
                      <span className={classes.textEllipsis}>
                        {steps[activeStep]}
                      </span>
                      <span
                        className={classes.textEllipsis}
                        style={{ fontSize: 10, color: "#c72323" }}
                      >
                        {this.state.choosedCars[steps[activeStep]] ||
                          "Choose Car"}
                      </span>
                    </React.Fragment>
                  ) : (
                    <span>Submit Form</span>
                  )}
                </div>
              )}
              <Button
                disabled={this.allStepsCompleted()}
                color="inherit"
                onClick={this.handleNext}
              >
                <ArrowForward style={{ fontSize: 42 }} />
              </Button>
              <Button color="inherit" onClick={this.handleComplete}>
                <Flag style={{ fontSize: 42 }} />
              </Button>
            </div>
            <LinearProgress
              variant="determinate"
              value={this.state.progress}
              style={{ border: "1px solid" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(VotePageStyles)(VotePage);
