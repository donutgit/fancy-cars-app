import React, { Component } from "react";
//mui
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Expantion from "./Expantion";
import NominationModal from "./NominationModal";
//styles
import styles from "./NominationsTable.jsx";
//q
import { ADD_NOMINATION, UPDATE_NOMINATION } from "../../../../apollo/queries";
import AppDataContext from "../../../../hoc/AppDataContext";

function createData(id, nomination, carsAmount, cars) {
  return { id, nomination, carsAmount, cars };
}
class Nominations extends Component {
  state = {
    open: false,
    modalData: {}
  };

  handleOpen = (type, nomination) => {
    console.log(type, nomination)
    this.setState({
      open: true,
      modalData: {
        type,
        nomination,
        mutation: type === "Add" ? ADD_NOMINATION : UPDATE_NOMINATION
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.tableHeader}>
          <div className={classes.tableHeaderCol}>
            <p>Nominations</p>
          </div>
          <div className={classes.tableHeaderCol}>
            <p>Cars</p>
          </div>
        </div>
        <AppDataContext>
          {({ nominations, poll }) => {
            const data = nominations.map(n => {
              const { name, id } = n;
              return createData(id, name, poll[name].length, poll[name]);
            });
            return data.map(d => {
              return (
                <Expantion
                  key={d.id}
                  data={d}
                  onModal={this.handleOpen}
                  onDelete={this.onDelete}
                />
              );
            });
          }}
        </AppDataContext>
        <div className={classes.addNewNom}>
          <Button
            variant="raised"
            color="primary"
            onClick={() => this.handleOpen("Add")}
          >
            Add new nomination
            <AddIcon className={classes.rightIcon} />
          </Button>
        </div>
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

export default withStyles(styles)(Nominations);
