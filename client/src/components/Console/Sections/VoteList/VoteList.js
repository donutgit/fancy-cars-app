import React, { PureComponent } from "react";
//mui
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//comp
import VoteCell from "./VoteCell";
import Spinner from "../../../UI/Spinner/Spinner";
//query
import { Query } from "react-apollo";
import { GET_VOTES } from "../../../../apollo/queries";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class VoteList extends PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Query query={GET_VOTES}>
              {client => {
                const { loading, error, data } = client;
                if (loading)
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <Spinner />
                      </TableCell>
                    </TableRow>
                  );
                if (error) return `Error! ${error.message}`;
                return data.votes.map(vote => (
                  <VoteCell key={vote.id} vote={vote} />
                ));
              }}
            </Query>
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(VoteList);
