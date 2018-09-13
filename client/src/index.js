import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import client from "./apollo/client";
//css
import "./index.css";

const app = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
