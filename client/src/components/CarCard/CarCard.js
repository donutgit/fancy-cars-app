import React, { PureComponent } from "react";
import NavLink from "react-router-dom/NavLink";
import Transition from "react-transition-group/Transition";
//mui
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Favorite from "@material-ui/icons/Favorite";
import Check from "@material-ui/icons/Check";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import withStyles from "@material-ui/core/styles/withStyles";
import Social from "../Social/Social";
import CarCardStyles from "./CarCardStyles";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 }
};
class SimpleMediaCard extends PureComponent {
  state = {
    overlay: false
  };

  render() {
    const { id, mark, model, imageUrl, votes } = this.props.car;
    const { classes, step, selected } = this.props;
    let img = imageUrl.split("upload/");
    let url = img[0] + "upload/h_400,f_auto/" + img[1];
    return (
      <MuiThemeProvider theme={theme}>
        <Card
          className={[
            classes.card,
            classes.DefaultCard,
            selected ? classes.ActiveCard : null
          ].join(" ")}
        >
          <CardMedia
            className={classes.media}
            image={url}
            title="Contemplative Reptile"
          />
          {/* <Image
            cloudName="dxfogjj18"
            publicId={imageUrl}
            // width="340"
            height="200"
            crop="fill"
            fetchFormat="auto"
          /> */}
          <div className={classes.Checked}>
            <Check
              size={12}
              style={{ position: "absolute", bottom: 8, right: 8 }}
            />
          </div>
          <CardContent>
            <Typography variant="headline" component="h2">
              {`${mark} ${model}`}
            </Typography>
            <Typography variant="body1">{votes || 0}</Typography>
          </CardContent>
          <Transition
            in={this.state.overlay}
            exit={true}
            appear={true}
            timeout={{
              enter: 200,
              exit: 500
            }}
          >
            {state => {
              if (state === "exited") {
                return null;
              }
              return (
                <div
                  className={classes.OverlayWrap}
                  style={{
                    transition: `opacity 300ms ease-in-out`,
                    opacity: 0,
                    ...transitionStyles[state]
                  }}
                >
                  <Social />
                  <IconButton
                    classes={{ root: classes.closeButton }}
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.setState({ overlay: false })}
                  >
                    <Close />
                  </IconButton>
                </div>
              );
            }}
          </Transition>
          <CardActions>
            <div className={classes.buttonsContainer}>
              <div>
                <Button
                  variant="raised"
                  size="small"
                  disabled={this.props.handleComplete ? false : true}
                  color="primary"
                  className={classes.voteButtons}
                  onClick={() => this.props.handleComplete(mark, model, step)}
                >
                  Vote
                </Button>
                <Button
                  variant="raised"
                  color="primary"
                  size="small"
                  component={NavLink}
                  to={`/cars/${id}`}
                  exact
                >
                  Info
                </Button>
              </div>
              <div>
                <IconButton
                  aria-label="Like"
                  color="primary"
                  onClick={() => this.setState({ overlay: true })}
                >
                  <Favorite />
                </IconButton>
                <IconButton aria-label="Edit" color="primary">
                  <Edit />
                </IconButton>
                <IconButton aria-label="Delete" color="secondary">
                  <Delete />
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(CarCardStyles)(SimpleMediaCard);
