import React from "react";
import AppDataContext from "./AppDataContext";
//APOLLO
import { Query } from "react-apollo";
import Spinner from "../components/UI/Spinner/Spinner";
import { GET_CARS_NOMINATIONS } from "../apollo/queries";

const navList = {
  label: [
    "Small Class",
    "Economy",
    "Compact",
    "Buisness",
    "Lux",
    "Coupe / Sport",
    "Electric / Hybrid",
    "Crossover",
    "SUV"
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
    "suv"
  ]
};

const withMongoData = Component =>
  class WithMongo extends React.PureComponent {
    render() {
      return (
        <Query query={GET_CARS_NOMINATIONS}>
          {client => {
            const { loading, error, data } = client;
            if (loading) return <Spinner />;
            if (error) return `Error! ${error.message}`;

            const poll = {};
            console.log("[HOC DATA] ", data);
            data &&
              data.nominations.forEach(nomination => {
                poll[nomination.name] = data.cars.filter(car => {
                  return car.nominations.includes(nomination.name);
                });
              });

            return (
              <AppDataContext.Provider
                value={{
                  poll,
                  cars: data.cars || {},
                  nominations: data.nominations || {},
                  navList
                }}
              >
                <Component />
              </AppDataContext.Provider>
            );
          }}
        </Query>
      );
    }
  };

export default withMongoData;
