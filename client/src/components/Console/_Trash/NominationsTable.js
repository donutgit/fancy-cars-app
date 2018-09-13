import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Expantion from "./Expantion";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styles from "./NominationsTable.jsx";
import {
  addNomination,
  deleteNomination,
  updateNomination
} from "../../../../queries";
import NominationModal from "./NominationModal";

function createData(id, nomination, carsAmount, cars) {
  return { id, nomination, carsAmount, cars };
}

class NominationsTable extends React.Component {
  state = {
    open: false,
    modalData: {
      modalMessage: "",
      buttonMessage: "",
      type: "",
      onAdd: null,
      onUpdate: null
    },
    success: false
  };
  onAdd = data => {
    addNomination(data).then(res => {
      if (res.status === 200) {
        this.props.onInit();
        this.handleClose();
        // this.setState({ success: true });
      }
    });
  };
  onDelete = id => {
    deleteNomination(id).then(res => {
      if (res.status === 200) {
        this.props.onInit();
      }
    });
  };
  onUpdate = (id, data) => {
    updateNomination(id, data).then(res => {
      if (res.status === 200) {
        this.props.onInit();
        this.handleClose();
      }
    });
  };
  handleOpen = (type, id) => {
    this.setState({
      open: true,
      modalData: {
        type: type,
        modalMessage: `${type === "add" ? "Add new" : "Update"} nomination`,
        buttonMessage: type === "add" ? "Add" : "Update",
        onAdd: this.onAdd,
        onUpdate: this.onUpdate,
        nominationId: id ? id : null
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, nominations, cars } = this.props;

    const data = nominations.map(item => {
      const { nomination, _id } = item;
      return createData(
        _id,
        nomination,
        cars[nomination].length,
        cars[nomination]
      );
    });

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
        {data.map(d => {
          return (
            <Expantion
              key={d.id}
              data={d}
              onModal={this.handleOpen}
              onDelete={this.onDelete}
            />
          );
        })}
        <div className={classes.addNewNom}>
          <Button
            variant="raised"
            color="primary"
            onClick={() => this.handleOpen("add")}
          >
            Add new nomination
            <AddIcon className={classes.rightIcon} />
          </Button>
        </div>
        <NominationModal
          open={this.state.open}
          close={this.handleClose}
          modalData={this.state.modalData}
        />
      </div>
    );
  }
}
export default withStyles(styles)(NominationsTable);
