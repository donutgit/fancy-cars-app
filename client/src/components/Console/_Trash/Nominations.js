import React from "react";
//mui
import AppDataContext from "../../../../hoc/AppDataContext";
import Spinner from "../../../UI/Spinner/Spinner";
import NominationsTable from "./NominationsTable";

const Nominations = props => {
  return (
    <AppDataContext.Consumer>
      {({ state: { nominations, allCars, error } }) => {
        if (nominations && allCars && !error) {
          return <NominationsTable nominations={nominations} cars={allCars} />;
        }
        return <Spinner />;
      }}
    </AppDataContext.Consumer>
  );
};

export default Nominations;
