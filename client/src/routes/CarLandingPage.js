import React from "react";
//mui
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
//components
import CarLanding from "../components/CarLanding/CarLanding";
import Spinner from "../components/UI/Spinner/Spinner";
import classes from "../styles/CarLandingPage.module.css";
//APOLLO
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_CAR = gql`
  query Car($id: String!) {
    car(id: $id) {
      mark
      model
      imageUrl
    }
  }
`;
class CarLandingPage extends React.Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <section className={classes.Root}>
            <div className={classes.Wrapper}>
              <Query
                query={GET_CAR}
                variables={{ id: this.props.match.params.id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <Spinner />;
                  if (error) return `Error! ${error.message}`;
                  return <CarLanding car={data.car} />;
                }}
              </Query>
              <Button
                variant="raised"
                size="small"
                color="primary"
                onClick={this.props.history.goBack}
                style={{ marginTop: "auto", bottom: "10px" }}
              >
                Back
              </Button>
            </div>
          </section>
        </Grid>
      </Grid>
    );
  }
}

export default CarLandingPage;
