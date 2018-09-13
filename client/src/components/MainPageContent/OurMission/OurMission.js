import React from "react";
//mui
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import ExpandedPannel from "./ExpandedPannel";
import { HeaderUnderline } from "../../../styles/MainPage.module.css";

const OurMission = props => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={6} style={{ padding: "0 15px" }}>
        <Typography variant="display1" align="left" className={HeaderUnderline}>
          OUR MISSION
        </Typography>
        <Typography
          variant="body1"
          align="left"
          style={{ marginBottom: "25px" }}
        >
          Quisque consectetur erat at rutrum sodales. Aenean est augue,
          convallis vitae eleifend in, elementum at velit. Mauris eu facilisis
          nisi. Cras suscipit in risus ac gravida. Pellentesque ante lectus,
          facilisis et elit eu, egestas mollis ante. Donec commodo ipsum sed
          elit gravida, non iaculis arcu ornare. Suspendisse eget eleifend nunc,
          at facilisis.
          <br />
          <br />
          Praesent maximus lorem et nisl pulvinar, vel tempus quam pulvinar.
          Cras nisl lacus, vulputate eu magna nec, fringilla finibus felis.
          Nulla sem turpis, elementum sed interdum non, cursus condimentum nisl.
          Vestibulum vitae tellus velit. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia Curae. Nulla
          fermentum purus vel enim pharetra, in suscipit ex ullamcorper. Nunc
          accumsan purus augue sit amet.
        </Typography>
        <Button variant="raised" color="primary">
          Read more
        </Button>
      </Grid>
      <Grid item xs={6} style={{ padding: "0 15px" }}>
        <Typography variant="display1" align="left" className={HeaderUnderline}>
          POPULAR QUESTIONS
        </Typography>
        <ExpandedPannel />
      </Grid>
    </Grid>
  );
};

export default OurMission;
