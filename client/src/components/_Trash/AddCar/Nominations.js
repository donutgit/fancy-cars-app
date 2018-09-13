import React from "react";
import { withStyles } from "material-ui/styles";
import CarCard from "../CarCard/CarCard";

const style = {
  Nominations: {
    display: 'grid',
    gridGap: "30px 15px",
    justifyItems: "center",
    gridAutoRows: "minmax(100px, auto)",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  }
};

const Nominations = props => {
  const { nomination, carsData, classes } = props;
  return (
    <div id={props.id}>
      <h1>{nomination}</h1>
      <div className={classes.Nominations}>
        {carsData.map(car => {
          return (
            <CarCard
              key={car.id}
              page="EditCars"
              car={car}
              openCarDialog={props.openCarDialog}
            />
          );
        })}
      </div>
    </div>
  );
};
export default withStyles(style)(Nominations);
