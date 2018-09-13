import React, { PureComponent } from "react";
//import axios from "axios";

import Button from "material-ui/Button";
import Spinner from "../../UI/Spinner/Spinner";
import CarCard from "../../CarCard/CarCard";
import Typography from "material-ui/Typography";
import cssModule from "../../AddCar/Nominations.css";

//const postLink = "http://localhost/wordpress/wp-json/wp/v2";
class StepperContent extends PureComponent {
  // state = {
  //   allCars: {},
  //   error: true
  // };
  // componentDidMount() {
  //   // buisness 8
  //   // sport 9
  //   // compact 10
  //   let allCars = [];
  //   axios.get(postLink + "/posts?categories=8").then(response => {
  //     allCars.push(response.data);
  //     return axios.get(postLink + "/posts?categories=9").then(response => {
  //       allCars.push(response.data);
  //       return axios.get(postLink + "/posts?categories=10").then(response => {
  //         allCars.push(response.data);
  //         this.setState({ allCars });
  //         this.setState({ error: false });
  //       });
  //     });
  //   });
  // }

  getStepContent(step) {
    let cars = <Spinner />;
    const {nominations, allCars, error} = this.props.provider;
    let currentStep = nominations[step];
    console.log()
    if (!error) {
      cars = allCars[currentStep].map(car => {
        // console.log("[CATS MAP]");
        return (
          <CarCard
            key={car.id}
            page="Vote"
            car={car}
            step={step}
            handleComplete={this.props.handleComplete}
            carInfoHandler={this.props.carInfoHandler}
          />
        );
      });
    }
    return cars;

  }

  render() {
    console.log("CONTENT");
    // const { classes } = this.props;
    const completedSteps = this.props.completed.size;
    const total = this.props.totalSteps();
    // console.log('progress ' + completedSteps + ' / ' + total);
    return (
      <div>
        <div className={cssModule.Nominations}>
          {this.getStepContent(this.props.activeStep)}
        </div>
        <div style={{ margin: "50px 0" }}>
          <Button
            variant="raised"
            disabled={this.props.activeStep === 0}
            color="secondary"
            onClick={this.props.handleBack}
            style={{ marginRight: "8px" }}
          >
            Back
          </Button>
          <Button
            variant="raised"
            color="primary"
            onClick={this.props.handleNext}
            style={{ marginRight: "8px" }}
          >
            Next
          </Button>
          {this.props.isStepOptional(this.props.activeStep) &&
            !this.props.completed.has(this.props.activeStep) && (
              <Button
                variant="raised"
                color="secondary"
                onClick={this.props.handleSkip}
                style={{ marginRight: "8px" }}
              >
                Skip
              </Button>
            )}
          {this.props.activeStep !== this.props.steps.length &&
            (this.props.completed.has(this.props.activeStep) ? (
              <Typography variant="caption">
                Step {this.props.activeStep + 1} already completed
              </Typography>
            ) : (
              <Button
                variant="raised"
                color="primary"
                onClick={this.props.handleComplete}
              >
                {completedSteps === this.props.totalSteps() - 1
                  ? "Finish"
                  : "Complete Step"}
              </Button>
            ))}
        </div>
      </div>
    );
  }
}

export default StepperContent;
