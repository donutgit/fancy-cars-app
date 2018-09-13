import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Button } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { REMOVE_VOTE, GET_VOTES } from "../../../../apollo/queries";
import AuthContext from "../../../../hoc/AuthContext";

const VoteCell = ({ vote }) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {vote.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.email}
      </TableCell>
      <TableCell component="th" scope="row">
        {vote.phone}
      </TableCell>
      <TableCell component="th" scope="row">
        <Mutation
          mutation={REMOVE_VOTE}
          refetchQueries={[{ query: GET_VOTES }]}
        >
          {mutate => (
            <AuthContext.Consumer>
              {({ user: { role } }) => (
                <Button
                  size="small"
                  variant="raised"
                  color="secondary"
                  onClick={
                    role === "Administrator"
                      ? () => mutate({ variables: { id: vote.id } })
                      : null
                  }
                >
                  Delete Vote
                </Button>
              )}
            </AuthContext.Consumer>
          )}
        </Mutation>
      </TableCell>
    </TableRow>
  );
};
export default VoteCell;
