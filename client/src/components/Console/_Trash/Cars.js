import React, { Component } from "react";
import AppDataContext from "../../../../hoc/AppDataContext";
import Spinner from "../../../UI/Spinner/Spinner";
import CarsSelect from "./CarsSelect";

class Cars extends Component {
  render() {
    return (
      <div>
        <AppDataContext.Consumer>
          {({ state: { pureData, error } }) => {
            if (pureData && !error) {
              return <CarsSelect cars={pureData} />;
            }
            return <Spinner />;
          }}
        </AppDataContext.Consumer>
      </div>
    );
  }
}

export default Cars;
