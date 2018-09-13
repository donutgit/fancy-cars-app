import React, { PureComponent } from "react";
import AppDataContext from "../hoc/AppDataContext";
//mui
import Grid from "@material-ui/core/Grid";
import CarPollNavigation from "../components/CarList/CarPollNavigation";
import CarList from "../components/CarList/CarList";
import classes from "../styles/CarList.module.css";
//

class CarsPage extends PureComponent {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.Root}>
            <AppDataContext.Consumer>
              {data => (
                <div className={classes.Wrapper}>
                  <CarPollNavigation nav={data.navList} />
                  <CarList data={data} />
                </div>
              )}
            </AppDataContext.Consumer>
          </section>
        </Grid>
      </Grid>
    );
  }
}

export default CarsPage;
