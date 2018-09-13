import React, { PureComponent } from "react";

import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepButton } from "material-ui/Stepper";
import Typography from "material-ui/Typography";


const styles = {
  xyi: {
    justifyContent: "left",
    transition: "all 0.4s ease-out",
    background:
      "linear-gradient(325deg, rgb(0, 15, 34), rgb(16, 34, 52), rgba(34,34,34,0), rgba(34,34,34,0))",
    backgroundPosition: "1% 50%",
    backgroundSize: "300% 300%",
    margin: "5px -16px",
    maxHeight: "30px",
    boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    "&:hover": {
      backgroundPosition: "99% 50%"
    }
  },
};

class StepperNav extends PureComponent {
  //const { classes } = props.classes;
  render() {
    return (
      <div>
        <Stepper
          style={{ backgroundColor: "#181C25" }}
          nonLinear
          connector={<div className="connector" />}
          orientation="vertical"
          activeStep={this.props.activeStep}
        >
          {this.props.steps.map((label, index) => {
            const stepProps = {};
            const buttonProps = {};
            if (this.props.isStepOptional(index)) {
              buttonProps.optional = (
                <Typography variant="caption" style={{ color: "#fff" }}>
                  Optional
                </Typography>
              );
            }
            if (() => this.props.isStepSkipped(index)) {
              stepProps.completed = false;
            }
            const completed = this.props.completed.has(index);

            return (
              <Step key={label} {...stepProps} id={this.props.hash[index]}>
                <StepButton
                  classes={{ root: this.props.classes.xyi }}
                  onClick={this.props.handleStep(index)}
                  completed={completed}
                  {...buttonProps}
                >
                  <Typography variant="body1" style={{ color: "#fff" }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" style={{ color: "#fff" }}>
                    {this.props.choosedCars[label]}
                  </Typography>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(StepperNav);
