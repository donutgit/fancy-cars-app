import React from "react";
import classes from "./PageNotFound.css";

const first = "{";
const second = "}";
const PageNotFound = props => (
  <div className={classes.codeArea}>
    <span style={{ color: "#777", fontStyle: "italic" }}>
      // 404 page not found.
    </span>
    <span>
      <span style={{ color: "#d65562" }}>if</span>
      <span>
        (<span style={{ color: "#4ca8ef" }}>!</span>
        <span style={{ fontStyle: "italic", color: "#bdbdbd" }}>found</span>);
      </span>
      <span>{JSON.stringify(first, null, 2)}</span>
    </span>
    <span>
      <span style={{ paddingLeft: "15px", color: "#2796ec" }}>
        <i style={{ width: "10px", display: "inline-block" }} />throw
      </span>
      <span>
        (<span style={{ color: "#a6a61f" }}>"(╯°□°)╯︵ ┻━┻"</span>);
      </span>
      <span style={{ display: "block" }}>{JSON.stringify(second, null, 2)}</span>
    </span>
  </div>
);

export default PageNotFound;
