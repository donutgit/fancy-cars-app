import React from "react";
import Dotdotdot from "react-dotdotdot";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import Collapse from "@material-ui/core/transitions/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import red from "@material-ui/core/colors/red";
// import FavoriteIcon from "@material-ui/core-icons/Favorite";
// import ShareIcon from "@material-ui/core-icons/Share";
// import ExpandMoreIcon from "@material-ui/core-icons/ExpandMore";
import MoreVert from "@material-ui/icons/MoreVert";
// import axios from "axios";
import classes from "./PostCard.module.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
// import MyTextBox from "./MyTextBox";

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});
class PostCard extends React.Component {
  state = { media: "", image: "", text: "" };

  getTitle = title => {
    return title.replace(/(\[:ru])|(\[:])|(\[:ua].*)/g, "");
  };
  getDate = propsDate => {
    let date = new Date(propsDate);
    var monthNames = [
      "ЯНВ",
      "ФЕВ",
      "МАР",
      "АПР",
      "МАЯ",
      "ИЮН",
      "ИЮЛ",
      "АВГ",
      "СЕН",
      "ОКТ",
      "НОЙ",
      "ДЕК"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    // var time = date.getHours() + ':' + date.getMinutes();

    return day + " " + monthNames[monthIndex] + " " + year;
  };

  // componentDidMount() {
  //   // let image = "";
  //   // let text = "";

  //   axios
  //     .get(this.props.post._links["wp:featuredmedia"][0].href)
  //     .then(response => {
  //       let image =
  //         "https://www.autocentre.ua/wp-content/uploads/" +
  //         response.data.media_details.file;
  //       this.setState({ image });
  //     });
  // }
  createMarkup = () => {
    return { __html: this.props.post.excerpt.rendered };
  };

  render() {
    // const { classes } = this.props;
    // console.log(this);
    return (
      <MuiThemeProvider theme={theme}>
        {/* <Card className={classes.PostCard}>
          <CardMedia
            className={classes.PostCardImage}
            image={this.state.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <a
              className={classes.PostCardLink}
              href={this.props.post.link}
              target="_blank"
            >
              <Dotdotdot clamp={2}>
                <p className={classes.PostCardText}>
                  {this.getTitle(this.props.post.title.rendered)}
                </p>
              </Dotdotdot>
            </a>
          </CardContent>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            }
            title="Author"
            subheader={this.getDate(this.props.post.date)}
          />
        </Card> */}
        <Card className={classes.PostCard}>
          <CardMedia
            className={classes.PostCardImage}
            image="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672251/autoroku_assets/news/autoroku_news_image_1.jpg"
            title="news"
          />
          <CardContent>
            <Dotdotdot clamp={2}>
              <p className={classes.PostCardText}>
                Nunc ac pulvinar ipsum. Nullam tempus lacinia.
              </p>
            </Dotdotdot>
          </CardContent>
          <CardHeader
            avatar={
              <Avatar aria-label="Avatar" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title="John Doe"
            // subheader={this.getDate(this.props.post.date)}
            subheader="10.05.2018"
          />
        </Card>{" "}
        <Card className={classes.PostCard}>
          <CardMedia
            className={classes.PostCardImage}
            image="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672251/autoroku_assets/news/autoroku_news_image_2.jpg"
            title="news"
          />
          <CardContent>
            <Dotdotdot clamp={2}>
              <p className={classes.PostCardText}>
                In ut justo eget urna sagittis sollicitudin arcu.
              </p>
            </Dotdotdot>
          </CardContent>
          <CardHeader
            avatar={
              <Avatar aria-label="Avatar" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title="John Doe"
            subheader="09.05.2018"
          />
        </Card>{" "}
        <Card className={classes.PostCard}>
          <CardMedia
            className={classes.PostCardImage}
            image="https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1536672251/autoroku_assets/news/autoroku_news_image_3.jpg"
            title="news"
          />
          <CardContent>
            <Dotdotdot clamp={2}>
              <p className={classes.PostCardText}>
              Cum sociis natoque penatib et magnis  parturient.
              </p>
            </Dotdotdot>
          </CardContent>
          <CardHeader
            avatar={
              <Avatar aria-label="Avatar" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title="John Doe"
            subheader="08.05.2018"
          />
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default PostCard;
