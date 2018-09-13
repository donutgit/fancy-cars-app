import React from "react";
import AppDataContext from "../hoc/AppDataContext";
//mui
import Charts from "../components/Charts/Charts";
import classes from "../styles/ChartsPage.module.css";

const ChartsPage = () => (
  <div className={classes.Root}>
    <div className={classes.Wrapper}>
      <h1>Charts</h1>
      <div className={classes.Content}>
        <AppDataContext.Consumer>
          {state => {
            const { nominations, poll } = state;

            return nominations.map(nomination => {
              //SORT DATA BY VOTES
              const sortedCars = poll[nomination.name].sort(function(a, b) {
                if (a.votes > b.votes) {
                  return 1;
                }
                if (a.votes < b.votes) {
                  return -1;
                }
                // a должно быть равным b
                return 0;
              });

              return (
                <Charts
                  key={nomination.id}
                  nomination={nomination.name}
                  cars={sortedCars}
                />
              );
            });
          }}
        </AppDataContext.Consumer>
      </div>
    </div>
  </div>
);

export default ChartsPage;
