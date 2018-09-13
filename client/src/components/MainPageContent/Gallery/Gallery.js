import React, { PureComponent } from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid";
import AppDataContext from "../../../hoc/AppDataContext";
import {
  TitleWrap,
  TitleUnderline
} from "../../../styles/MainPage.module.css";
import GalleryImages from "./GalleryImages";

class Gallery extends PureComponent {
  render() {
    return (
      <Grid container spacing={0} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className={TitleWrap}>
            <Typography
              variant="display1"
              align="center"
              className={TitleUnderline}
            >
              PARTISIPANTS
            </Typography>
          </div>
          <AppDataContext.Consumer>
            {({ cars }) => {
              // СЛУЧАЙНОЕ ПЕРЕМЕШИВАНИЕ
              let shuffle;
              shuffle = Object.values(cars);
              let j, temp;
              for (var i = shuffle.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = shuffle[j];
                shuffle[j] = shuffle[i];
                shuffle[i] = temp;
              }
              return (
                <GalleryImages data={shuffle.slice(0, 8)} />
              );
            }}
          </AppDataContext.Consumer>
        </Grid>
      </Grid>
    );
  }
}

export default Gallery;
