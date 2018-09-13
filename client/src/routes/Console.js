import React from "react";
// import { Redirect } from "react-router-dom";
// import withAuthorization from "../../hoc/withAuthorization";
// import AuthContext from "../../hoc/AuthContext";
import ConsoleRoot from "../components/Console/ConsoleRoot";

class Console extends React.Component {
  render() {
    return <ConsoleRoot />
  }
}

// const authCondition = userData => userData.role === "Administrator";

// export default withAuthorization(authCondition)(Console);
export default Console;
