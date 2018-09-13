import React from "react";
// import { Route } from "react-router-dom";
import { withStyles } from "material-ui/styles";
//import axios from 'axios';

// import { db, dbStore } from "../../firebase/firebase";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

//import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

import Stepper, { Step, StepButton } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import CarCard from "../../components/CarCard/CarCard";

import StepperNav from "../../components/Steps/StepperNav/StepperNav";
import StepperConent from "../../components/Steps/StepperContent/StepperConent";
// import CarInfo from "../../components/CarInfo/CarInfo";
import EnhancedForm from "../../components/Form/From";
import { AppContext } from "../../hoc/AppProvider";
import cssModule from "../../components/AddCar/Nominations.css";

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
    backgroundColor: "#181C25",
    height: "calc(100vh - 130px)",
    overflow: "auto"
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
  xyi: {
    justifyContent: "left",
    transition: "all 0.4s ease-out",
    background:
      "linear-gradient(325deg, rgb(0, 15, 34), rgb(16, 34, 52), rgba(34,34,34,0), rgba(34,34,34,0))",
    backgroundPosition: "1% 50%",
    backgroundSize: "300% 300%",
    margin: "5px -16px",
    maxHeight: "30px",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      backgroundPosition: "99% 50%"
    }
  }
});

// function getSteps() {
//   return ["Buisness", "Sport", "Comfort"];
// }
// const apiUrl = "http://localhost/wordpress/wp-json/wp/v2";
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
    completed: new Set(),
    skipped: new Set(),
    choosedCars: {},
    allCars: [],
    nominations: [],
    error: false
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
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  isStepOptional = step => {
    return step === 1;
    // return;
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
    const hash = this.getSteps("hash");

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed
      // find the first step that has been completed

      const steps = this.getSteps();
      activeStep = steps.findIndex((step, i) => !this.state.completed.has(i));
    } else {
      activeStep = this.state.activeStep + 1;
      // this.props.history.push("/vote#" + hash[activeStep]);
      document.getElementById(hash[activeStep]).scrollIntoView();
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
    this.setState({ choosedCars: choosedCars });
    // SET STEP AS COMPLETED
    const completed = new Set(this.state.completed);
    completed.add(this.state.activeStep);
    this.setState({
      completed
    });
    // console.log("step completed. Chosed cars: ", this.state.choosedCars);
    /**
     * Sigh... it would be much nicer to replace the following if conditional with
     * `if (!this.allStepsComplete())` however state is not set when we do this,
     * thus we have to resort to not being very DRY.
     */
    if (completed.size !== this.totalSteps() - this.skippedSteps()) {
      this.handleNext();
    }
  };

  voteReset = () => {
    this.setState({
      activeStep: 0,
      completed: new Set(),
      skipped: new Set()
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
  // carInfoRemove = () => {
  //   this.props.history.push("/vote");
  // };
  componentDidMount() {
    // ----------LOAD DATA VIA WORDPRESS-----------
    // buisness 8
    // sport 9
    // compact 10
    // let allCars = [];
    // axios.get(apiUrl + "/posts?categories=8").then(response => {
    //   allCars.push(response.data);
    //   return axios.get(apiUrl + "/posts?categories=9").then(response => {
    //     allCars.push(response.data);
    //     return axios.get(apiUrl + "/posts?categories=10").then(response => {
    //       allCars.push(response.data);
    //       this.setState({ allCars });
    //       this.setState({ error: false });
    //     });
    //   });
    // });
    // ----------LOAD DATA VIA FIREBASE-------------
    // db.ref("nominations").on("value", snapshot => {
    //   let data = snapshot.val();
    //   let nominations = Object.keys(data);
    //   let allCars = [];
    //   nominations.forEach(nom => {
    //     allCars.push(Object.values(data[nom]));
    //   });
    //   console.log(allCars);
    //   this.setState({ nominations, allCars, error: false});
    // });
    // ----------LOAD DATA VIA FIRESTORE-------------
    // dbStore
    //   .collection("poll")
    //   .doc("nominations")
    //   .get()
    //   .then(doc => {
    //     if (doc.exists) {
    //       const nomArr = Object.values(doc.data().list).filter(nom => {
    //         return (
    //           nom !== "Design" &&
    //           nom !== "Price / Quality" &&
    //           nom !== "Best Crossover / SUV 2018" &&
    //           nom !== "Best Car 2018"
    //         );
    //       });
    //       dbStore
    //         .collection("poll")
    //         .doc("cars")
    //         .onSnapshot(doc => {
    //           if (doc.exists) {
    //             const poll = {};
    //             nomArr.forEach(nom => {
    //               let filter = Object.values(doc.data()).filter(car => {
    //                 return car.nominations.includes(nom);
    //               });
    //               poll[nom] = filter;
    //             });
    //             console.log(poll);
    //             this.setState({
    //               nominations: nomArr,
    //               allCars: poll,
    //               error: false
    //             });
    //           } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document - [cars]");
    //           }
    //         });
    //     } else {
    //       console.log("No such document - [nominations]");
    //     }
    //   });
  }

  render() {
    console.log("VOTEPAGE");
    const { classes } = this.props;
    const steps = this.getSteps();
    const hash = this.getSteps("hash");
    const { activeStep } = this.state;
    const votePageContent =
      this.props.match.path === "/vote" && this.props.match.isExact ? (
        <Grid container spacing={24}>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paper}>
              {/* <StepperNav
                activeStep={activeStep}
                steps={steps}
                hash={hash}
                completed={this.state.completed}
                isStepOptional={this.isStepOptional}
                isStepSkipped={this.isStepSkipped}
                handleStep={this.handleStep}
                isStepComplete={this.isStepComplete}
                choosedCars={this.state.choosedCars}
              /> */}
              {/* --------------------NAVIDATION------------------------ */}
              <div>
                <Stepper
                  style={{ backgroundColor: "#181C25" }}
                  nonLinear
                  connector={<div className="connector" />}
                  orientation="vertical"
                  activeStep={this.state.activeStep}
                >
                  {steps.map((label, index) => {
                    const stepProps = {};
                    const buttonProps = {};
                    if (this.isStepOptional(index)) {
                      buttonProps.optional = (
                        <Typography variant="caption" style={{ color: "#fff" }}>
                          Optional
                        </Typography>
                      );
                    }
                    if (() => this.isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    const completed = this.state.completed.has(index);

                    return (
                      <Step key={label} {...stepProps} id={hash[index]}>
                        <StepButton
                          classes={{ root: classes.xyi }}
                          onClick={this.handleStep(index)}
                          completed={completed}
                          {...buttonProps}
                        >
                          <Typography variant="body1" style={{ color: "#fff" }}>
                            {label}
                          </Typography>
                          <Typography
                            variant="caption"
                            style={{ color: "#fff" }}
                          >
                            {this.state.choosedCars[label]}
                          </Typography>
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>
              </div>
              {/* --------------------NAVIDATION------------------------ */}
            </Paper>
          </Grid>
          <Grid item xs={12} md>
            <Paper className={classes.paper}>
              <div>
                {this.allStepsCompleted() && !this.state.error ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&quot;re finished
                    </Typography>
                    <EnhancedForm
                      voteReset={this.voteReset}
                      choosedCars={this.state.choosedCars}
                    />
                    {/* <Button onClick={this.handleReset}>Reset</Button> */}
                  </div>
                ) : (
                  <div>
                    <AppContext.Consumer>
                      {({ state }) => {
                        // return (
                        //   <StepperConent
                        //     activeStep={activeStep}
                        //     getStepContent={this.getStepContent}
                        //     handleBack={this.handleBack}
                        //     handleNext={this.handleNext}
                        //     isStepOptional={this.isStepOptional}
                        //     completed={this.state.completed}
                        //     handleSkip={this.handleSkip}
                        //     handleComplete={this.handleComplete}
                        //     completedSteps={this.completedSteps}
                        //     totalSteps={this.totalSteps}
                        //     steps={steps}
                        //     carInfoHandler={this.carInfoHandler}
                        //     error={this.state.error}
                        //     allCars={this.state.allCars}
                        //     nominations={this.state.nominations}
                        //     provider={state}
                        //   />
                        // );
                        let cars = <Spinner />;
                        if (!state.error) {
                          let currentStep =
                            state.nominations[this.state.activeStep];
                          cars = state.allCars[currentStep].map(car => {
                            return (
                              <CarCard
                                key={car.id}
                                page="Vote"
                                car={car}
                                step={this.state.activeStep}
                                handleComplete={this.handleComplete}
                                carInfoHandler={this.carInfoHandler}
                              />
                            );
                          });
                        }
                        return (
                          <div>
                            <div className={cssModule.Nominations}>{cars}</div>
                          </div>
                        );
                      }}
                    </AppContext.Consumer>
                    <div style={{ margin: "50px 0" }}>
                      <Button
                        variant="raised"
                        disabled={this.state.activeStep === 0}
                        color="secondary"
                        onClick={this.handleBack}
                        style={{ marginRight: "8px" }}
                      >
                        Back
                      </Button>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.handleNext}
                        style={{ marginRight: "8px" }}
                      >
                        Next
                      </Button>
                      {this.isStepOptional(this.props.activeStep) &&
                        !this.state.completed.has(this.state.activeStep) && (
                          <Button
                            variant="raised"
                            color="secondary"
                            onClick={this.handleSkip}
                            style={{ marginRight: "8px" }}
                          >
                            Skip
                          </Button>
                        )}
                      {this.state.activeStep !== steps.length &&
                        (this.state.completed.has(this.state.activeStep) ? (
                          <Typography variant="caption">
                            Step {this.state.activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button
                            variant="raised"
                            color="primary"
                            onClick={this.handleComplete}
                          >
                            {this.completedSteps === this.totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </Paper>
          </Grid>
        </Grid>
      ) : null;

    return <div className={classes.root}>{votePageContent}</div>;
  }
}

export default withStyles(styles)(VotePage);
