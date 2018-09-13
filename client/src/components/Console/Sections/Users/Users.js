import React, { Component } from "react";
import UsersList from "./UsersList";
import { Query } from "react-apollo";
import { GET_USERS } from "../../../../apollo/queries";
import Spinner from "../../../UI/Spinner/Spinner";
//query

class Users extends Component {
  render() {
    return (
      <Query query={GET_USERS}>
        {client => {
          const { loading, error, data } = client;
          if (loading) return <Spinner />;
          if (error) return `Error! ${error.message}`;
          console.log(data);
          return data.users.map(user => (
            <UsersList key={user.id} user={user} onDelete={this.onDelete} />
          ));
        }}
      </Query>
    );
  }
}

export default Users;
