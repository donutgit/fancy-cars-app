import React from "react";
import PropTypes from "prop-types";
//mui
import withStyles from "@material-ui/core/styles/withStyles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";

import Typography from "@material-ui/core/Typography";
import ExpandMore from "@material-ui/icons/ExpandMore";

const styles = theme => ({
  root: {
    width: "100%"
  },
  Pannel: {
    margin: "15px 0",
    backgroundColor: "transparent",
    border: "1px solid #00BCD4"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={this.handleChange("panel1")}
          className={classes.Pannel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>Sed ultricies mauris luctus maximus mattis?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Pellentesque augue ipsum, tincidunt vitae tellus volutpat,
              eleifend pharetra erat. Donec non dignissim quam. Maecenas leo
              odio, tempor sed ultricies nec, egestas ac nulla. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae; Donec maximus, elit quis maximus sagittis.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel2"}
          onChange={this.handleChange("panel2")}
          className={classes.Pannel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>
              Nullam semper risus a diam eleifend, id interdum?
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Pellentesque augue ipsum, tincidunt vitae tellus volutpat,
              eleifend pharetra erat. Donec non dignissim quam. Maecenas leo
              odio, tempor sed ultricies nec, egestas ac nulla. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae; Donec maximus, elit quis maximus sagittis.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel
          expanded={expanded === "panel3"}
          onChange={this.handleChange("panel3")}
          className={classes.Pannel}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>Proin blandit metus eu accumsan vestibulum</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Pellentesque augue ipsum, tincidunt vitae tellus volutpat,
              eleifend pharetra erat. Donec non dignissim quam. Maecenas leo
              odio, tempor sed ultricies nec, egestas ac nulla. Vestibulum ante
              ipsum primis in faucibus orci luctus et ultrices posuere cubilia
              Curae; Donec maximus, elit quis maximus sagittis.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ControlledExpansionPanels);
