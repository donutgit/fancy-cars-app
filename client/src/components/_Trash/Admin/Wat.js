import React from "react";
import axios from "../../../queries/axiosInstance";

const nom = [
  "Small Class",
  "Economy",
  "Compact",
  "Buisness",
  "Lux",
  "Coupe / Sport",
  "Electric / Hybrid",
  "Crossover",
  "SUV",
  "Design",
  "Price / Quality",
  "Best Crossover / SUV 2018",
  "Best Car 2018"
];

class Wat extends React.PureComponent {
  componentDidMount() {
    nom.forEach(name => {
      axios
        .post("/api/nominations", {
          name: name
        })
        .then(res => console.log(res));
    });
  }
  render() {
    return <div />;
  }
}

export default Wat;
