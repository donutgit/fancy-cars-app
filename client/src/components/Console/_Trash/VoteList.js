import React, { PureComponent } from "react";
//mui
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//cos
import { dbStore } from "../../../../firebase/firebase";
import VoteCell from "./VoteCell";
import Spinner from "../../../UI/Spinner/Spinner";

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
  state = {
    votes: null
  };
  componentWillMount() {
    dbStore
      .collection("poll")
      .doc("votes")
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({ votes: doc.data() });
        } else {
          throw new Error("No such document - [nominations].");
        }
      });
  }
  render() {
    const { votes } = this.state;
    const { classes } = this.props;

    return votes ? (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(votes).map(id => {
              return <VoteCell key={id} vote={votes[id]} />;
            })}
          </TableBody>
        </Table>
      </Paper>
    ) : (
      <Spinner />
    );
  }
}

export default withStyles(styles)(VoteList);
