import React from "react";
import NavLink from "react-router-dom/NavLink";
import FontAwesome from "react-fontawesome";
import { Line } from "react-chartjs-2";
//mui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import classes from "./Charts.module.css";

const chartColor = "#FFFFFF";
const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});
const data = props => canvas => {
  var ctx = canvas.getContext("2d");

  var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke.addColorStop(0, "#80b6f4");
  gradientStroke.addColorStop(1, chartColor);

  // var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
  // gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
  // gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");

  // DATA
  let cars = [];
  let votes = [];
  props.forEach(car => {
    cars.push(car.mark + " " + car.model);
    votes.push(car.votes);
  });
  //DATA

  return {
    labels: cars,
    datasets: [
      {
        label: "Votes",
        borderColor: "#ffffff",
        pointBorderColor: "#FFF",
        pointBackgroundColor: "#f96332",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointRadius: 6,
        fill: true,
        // backgroundColor: gradientFill,
        borderWidth: 4,
        data: votes
      }
    ]
  };
};
const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  tooltips: {
    bodySpacing: 4,
    mode: "nearest",
    intersect: 0,
    position: "nearest",
    xPadding: 10,
    yPadding: 10,
    caretPadding: 10
  },
  responsive: 1,
  scales: {
    yAxes: [
      {
        ticks: {
          display: true,
          fontColor: "rgba(255,255,255, 0.8)"
        },
        gridLines: {
          zeroLineColor: "rgba(255,255,255, 0.25)",
          color: "rgba(255,255,255, 0.25)",
          borderDash: [3, 3],
          offsetGridLines: true
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          display: false,
          fontColor: "rgba(255,255,255, 0.8)"
        },
        gridLines: {
          zeroLineColor: "rgba(255,255,255, 0.25)",
          color: "rgba(255,255,255, 0.25)",
          borderDash: [3, 3],
          offsetGridLines: true
        }
      }
    ]
  },
  layout: {
    padding: { left: 0, right: 10, top: 15, bottom: 5 }
  }
};

class Charts extends React.Component {
  render() {
    const winner = this.props.cars[this.props.cars.length - 1];
    return (
      <div className={classes.Root}>
        <MuiThemeProvider theme={theme}>
          <Card>
            <CardContent>
              <h2 className={classes.CardHeading}>{this.props.nomination}</h2>
            </CardContent>
            <CardMedia
              image={winner.imageUrl}
              title="Contemplative Reptile"
              style={{ height: "220px" }}
            />
            <div className={classes.ChartPaper}>
              <Line data={data(this.props.cars)} options={options} />
            </div>
            <CardContent>
              <Typography
                variant="title"
                align="left"
                style={{ marginBottom: "5px" }}
              >
                {winner.mark + " " + winner.model}
              </Typography>
              <Typography variant="subheading" align="left">
                {`Total votes - ${winner.votes}`}
              </Typography>
            </CardContent>
            <Divider style={{ margin: "0px 24px" }} />
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button
                variant="raised"
                size="medium"
                color="secondary"
                component={NavLink}
                to={`/cars/${winner.id}`}
                exact
              >
                Info
              </Button>
              <div className={classes.Social}>
                <IconButton aria-label="Like" color="primary">
                  <FontAwesome name="facebook-f" />
                </IconButton>
                <IconButton aria-label="Like" color="primary">
                  <FontAwesome name="google-plus" />
                </IconButton>
                <IconButton aria-label="Like" color="primary">
                  <FontAwesome name="twitter" />
                </IconButton>
              </div>
            </CardActions>
          </Card>
        </MuiThemeProvider>
      </div>
    );
  }
}
export default Charts;
