import React from "react";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
//icons
import Close from "@material-ui/icons/Close";

import AddCarForm from "./AddCarForm";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FullScreenDialog = props => {
  const { formData, classes, open, onClose } = props;
  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {formData
              ? `Edit ${formData.mark} ${formData.model}`
              : "Add new car"}
          </Typography>
          <IconButton color="inherit" onClick={onClose} aria-label="Close">
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AddCarForm
        formData={formData}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default withStyles(styles)(FullScreenDialog);
