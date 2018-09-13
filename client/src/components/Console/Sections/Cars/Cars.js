import React from "react";
import CarsSelect from "./CarsSelect";
import AppDataContext from "../../../../hoc/AppDataContext";

const Cars = () => (
  <AppDataContext.Consumer>
    {({ cars }) => <CarsSelect cars={cars} />}
  </AppDataContext.Consumer>
);

export default Cars;
