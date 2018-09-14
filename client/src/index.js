import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import registerServiceWorker from "./registerServiceWorker";
import { ApolloProvider } from "react-apollo";
import client from "./apollo/client";
import ReactGA from "react-ga";
//css
import "./index.css";

ReactGA.initialize("UA-125702510-1");
ReactGA.pageview(window.location.pathname + window.location.search);
const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));
registerServiceWorker();
