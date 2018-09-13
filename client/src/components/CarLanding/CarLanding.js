import React from "react";

const CarLanding = props => {
  const { car } = props;
  return (
    <div>
      <h1>{car.mark}</h1>
      <p>{car.model}</p>
      <div>
        <img
          style={{ display: "block", width: "100%" }}
          src={car.imageUrl}
          alt={car.mark}
        />
      </div>
    </div>
  );
};

export default CarLanding;
