// import React from "react";
// import { withRouter } from "react-router-dom";
// import { isUserAuthenticated, getToken } from "../apollo/AuthHelpers";
// import { getUserData } from "../apollo/queries";
// import AuthContext from "../hoc/AuthContext";

// const withAuthorization = authCondition => Component => {
//   class WithAuthorization extends React.Component {
//     componentDidMount() {
//       if (isUserAuthenticated()) {
//         getUserData(getToken()).then(({ data }) => {
//           if (!authCondition(data.user)) {
//             this.props.history.push("/login");
//           }
//         });
//       }
//     }

//     render() {
//       return (
//         <AuthContext.Consumer>
//           {({ authenticated }) => (authenticated ? <Component /> : null)}
//         </AuthContext.Consumer>
//       );
//     }
//   }
//   // withRouter для того чтобы сделать push("/login")
//   return withRouter(WithAuthorization);
// };

// export default withAuthorization;

import React from "react";
import AuthContext from "./AuthContext";
//APOLLO
import { Query } from "react-apollo";
import Spinner from "../components/UI/Spinner/Spinner";
import decode from "jwt-decode";
import { getAccessToken } from "../apollo/AuthHelpers";

const withAuthorization = Component =>
  class WithAuthorization extends React.PureComponent {
    render() {
      const token = decode(getAccessToken());
      console.log(token);
      return (
        <Query query={GET_USER} variables={{ id }}>
          {client => {
            const { loading, error, data } = client;
            if (loading) return <Spinner />;
            if (error) return `Error! ${error.message}`;
            console.log(data);

            return (
              <AuthContext.Provider
                value={{
                  data
                }}
              >
                <Component />
              </AuthContext.Provider>
            );
          }}
        </Query>
      );
    }
  };

export default withAuthorization;
