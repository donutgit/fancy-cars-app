import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Spinner from "../../UI/Spinner/Spinner";
import PostCard from "./PostCard";
import classes from "./News.module.css";
import { TitleWrap, TitleUnderline } from "../../../styles/MainPage.module.css";

const News = props => {
  // console.log(props);

  // let posts = <Spinner />;
  // if (!props.loading) {
  //   posts = props.posts.map(post => {
  //     return (
  //       <PostCard key={post.id} post={post} />
  //     )
  //   })
  // }

  return (
    <Grid container spacing={0} alignContent="center" alignItems="center">
      <Grid item xs={12}>
      <div className={TitleWrap}>
        <Typography
          variant="display1"
          align="center"
          className={TitleUnderline}
        >
          LATEST NEWS
        </Typography>
        </div>
        <div className={classes.News}>
          <PostCard />
        </div>
      </Grid>
    </Grid>
  );
};

export default News;
