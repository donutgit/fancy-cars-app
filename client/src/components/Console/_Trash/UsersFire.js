import React, { Component } from "react";
import { firebase } from "../../../../firebase/index";
import Spinner from "../../../UI/Spinner/Spinner";
import UsersList from "./UsersList";

class Users extends Component {
  state = {
    users: null,
  };

  componentDidMount() {
    firebase.dbStore
      .collection("userbase")
      .doc("users")
      .onSnapshot(
        doc => {
          if (doc.exists) {
            this.setState({ users: doc.data() });
          } else console.log("doc doesnt exist");
        },
        error => console.log("error getting snapshot", error)
      );
  }

  render() {
    const { users } = this.state;

    return users ? (
      Object.keys(users).map(uid => <UsersList key={uid} user={users[uid]} />)
    ) : (
      <Spinner />
    );
  }
}

export default Users;
