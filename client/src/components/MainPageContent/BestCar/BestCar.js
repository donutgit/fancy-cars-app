import React from "react";
import Grid from "@material-ui/core/Grid";
import classes from "./BestCar.module.css";

const BestCar = props => (
  <Grid container spacing={0}>
    <Grid item xs={7} style={{ padding: "0 15px" }}>
      <div className={classes.BestCarComposition}>
        <p>Vote for</p>
        <p>Best car 2018</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          bibendum, mi sed fermentum pulvinar, enim tortor dictum.
        </p>
        <img
          src="http://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536671643/autoroku_assets/car-633x238.png"
          alt="car"
        />
      </div>
    </Grid>
    <Grid item xs={5} style={{ padding: "0 15px" }}>
      <div className={classes.BestCarVoteSteps}>
        <div className={classes.StepTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
          </svg>
          <h4>START OF VOTING</h4>
        </div>
        <p>
          Phasellus convallis risus sit amet cursus vestibulum. Vestibulum vitae
          tristique felis. Vivamus euismod pharetra dolor vel tempus.
        </p>
        <div className={classes.StepTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M18 13h-.68l-2 2h1.91L19 17H5l1.78-2h2.05l-2-2H6l-3 3v4c0 1.1.89 2 1.99 2H19c1.1 0 2-.89 2-2v-4l-3-3zm-1-5.05l-4.95 4.95-3.54-3.54 4.95-4.95L17 7.95zm-4.24-5.66L6.39 8.66c-.39.39-.39 1.02 0 1.41l4.95 4.95c.39.39 1.02.39 1.41 0l6.36-6.36c.39-.39.39-1.02 0-1.41L14.16 2.3c-.38-.4-1.01-.4-1.4-.01z" />
            <path fill="none" d="M0 0h24v24H0V0z" />
          </svg>
          <h4>PRIZES</h4>
        </div>
        <p>
          Proin vulputate egestas leo sit amet tincidunt. Sed pulvinar
          ullamcorper nibh. Cum sociis natoque penatibus et magnis dis.
        </p>
        <div className={classes.StepTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <h4>STATISTICS</h4>
        </div>
        <p>
          Etiam pellentesque pretium eros, nec pulvinar purus efficitur a. Sed
          accumsan tempor odio, pretium vehicula turpis egestas in.
        </p>
      </div>
    </Grid>
  </Grid>
);

export default BestCar;
