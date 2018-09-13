import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { getAccessToken, getRefreshToken } from "./AuthHelpers";

// here we setting every request with tokens from local torage
// and listen all responses for new tokens and updating them in LS


const httpLink = createHttpLink({
  uri: "/graphql"
});

//GET TOKENS AND SET IN TO HEADERS
const middlewareLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getAccessToken();
  const refreshToken = getRefreshToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "x-token": token ? token : "",
      "x-refresh-token": refreshToken ? refreshToken : ""
    }
  };
});

//LISETEN NEW TOKENS IN HEADERS
const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers }
    } = operation.getContext();
    //IF IN HEADERS EXIST NEW TOKENS => SAVE THEM IN LOCAL STORAGE
    if (headers) {
      const token = headers.get("x-token");
      const refreshToken = headers.get("x-refresh-token");

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    return response;
  })
);

//CONNECT
const httpLinkWithMiddleware = afterwareLink.concat(
  middlewareLink.concat(httpLink)
);

const client = new ApolloClient({
  link: httpLinkWithMiddleware,
  cache: new InMemoryCache()
});

export default client;
