import React, { PureComponent } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

import { graphql } from "react-apollo";
import gql from "graphql-tag";
import NominationModal from "../../Console/Sections/Nominations/NominationModal";
import {
  GET_NOMINATIONS,
  ADD_NOMINATION,
  UPDATE_NOMINATION,
  REMOVE_NOMINATION
} from "../../../graphql";
import compose from "recompose/compose";

class Admin extends PureComponent {
  state = {
    open: false,
    modalData: {}
  };

  handleOpen = (type, nomination) => {
    console.log(type);
    this.setState({
      open: true,
      modalData: {
        type,
        nomination,
        mutation: type === "add" ? ADD_NOMINATION : UPDATE_NOMINATION
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log(this.props);
    const nominations = this.props.data.nominations || [];
    return (
      <div>
        <ul style={{ width: "500px" }}>
          {nominations.map(n => (
            <li
              key={n.id}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <p style={{ flex: 1 }}>{n.name}</p>
              <Button
                variant="raised"
                color="inherit"
                style={{ marginLeft: "5px" }}
                onClick={() => this.handleOpen("add")}
              >
                Add
              </Button>
              <Button
                variant="raised"
                color="primary"
                style={{ marginLeft: "5px" }}
                onClick={() => this.handleOpen("update", n)}
              >
                Update
              </Button>
              <Button
                variant="raised"
                color="secondary"
                style={{ marginLeft: "5px" }}
                onClick={() => this.props.mutate({ variables: { id: n.id } })}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
        {this.state.open ? (
          <NominationModal
            open={this.state.open}
            close={this.handleClose}
            modalData={this.state.modalData}
          />
        ) : null}
      </div>
    );
  }
}

export default compose(
  graphql(GET_NOMINATIONS),
  graphql(REMOVE_NOMINATION, {
    options: {
      // update: (proxy, { data: { removeNomination } }) => {
      //   const { nominations } = proxy.readQuery({ query: GET_NOMINATIONS });
      //   const filterNom = nominations.filter(e => e.id !== removeNomination.id);
      //   proxy.writeQuery({ query: GET_NOMINATIONS, data: filterNom });
      // },
      refetchQueries: [{ query: GET_NOMINATIONS }]
    }
  })
)(Admin);
