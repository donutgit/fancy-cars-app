import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
//apollo
import { Mutation } from "react-apollo";
import { REMOVE_USER, GET_USERS } from "../../../../apollo/queries";
import AuthContext from "../../../../hoc/AuthContext";

const styles = theme => ({
  root: {
    width: "100%",
    marginBottom: "3px"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "flex-start"
  },
  column: {
    flexBasis: "50%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  },
  chip: {
    margin: "5px"
  }
});

class UsersList extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className={classes.column}>
              <Typography className={classes.heading}>{user.email}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>
                {user.date}
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              {Object.values(user).map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </div>
            <div className={classNames(classes.column, classes.helper)}>
              <Typography variant="caption">
                Select your destination of choice
                <br />
                <a href="#sub-labels-and-columns" className={classes.link}>
                  Learn more
                </a>
              </Typography>
            </div>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelActions>
            <Mutation
              mutation={REMOVE_USER}
              refetchQueries={[{ query: GET_USERS }]}
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
                          ? () => mutate({ variables: { id: user.id } })
                          : null
                      }
                    >
                      Remove User
                    </Button>
                  )}
                </AuthContext.Consumer>
              )}
            </Mutation>
            <Button size="small" variant="raised" color="primary">
              Close
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
    );
  }
}

UsersList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersList);
