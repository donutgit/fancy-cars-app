import React from "react";

export const DisplayFormikState = props => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <pre
        style={{
          fontSize: "1rem",
          padding: ".5rem",
          color: "#a0a0a0"
        }}
      >
        <strong>props</strong> = {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};
