import React, { PureComponent } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import CarCard from "../CarCard/CarCard";

const styles = theme => ({
  root: {
    padding: "40px"
  },
  addCarButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px"
  },
  Nominations: {
    display: "grid",
    gridGap: "30px 15px",
    justifyItems: "center",
    gridAutoRows: "minmax(100px, auto)",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
  }
});

class CarList extends PureComponent {
  render() {
    const { classes } = this.props;
    const { nominations, poll, navList } = this.props.data;

    //filter nominations
    let noms = [];
    if (nominations) {
      noms = nominations.filter(nomination => {
        return (
          nomination.name !== "Design" &&
          nomination.name !== "Price / Quality" &&
          nomination.name !== "Best Crossover / SUV 2018" &&
          nomination.name !== "Best Car 2018"
        );
      });
    }

    return (
      <div className={classes.root}>
        {noms.map((nomination, index) => {
          return (
            <div id={navList.hash[index]} key={nomination.name}>
              <h1>{nomination.name}</h1>
              <div className={classes.Nominations}>
                {poll[nomination.name].map(car => {
                  return <CarCard key={car.id} car={car} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(CarList);
