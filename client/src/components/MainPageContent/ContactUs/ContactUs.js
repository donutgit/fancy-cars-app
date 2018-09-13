import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import classes from "./ContactUs.module.css";
import { HeaderUnderline } from "../../../styles/MainPage.module.css";
import ButtonSvg from "../../UI/Button/ButtonSvg";

const ContactUs = props => (
  <div style={{ padding: "0px 15px" }}>
    <Typography variant="display1" align="left" className={HeaderUnderline}>
      CONTACT US
    </Typography>
    <form className={classes.Form}>
      <div className={classes.DoubleFields}>
        <TextField
          id="name"
          label="Name"
          className={classes.TextField}
          margin="normal"
        />
        <TextField
          id="email"
          label="E-mail"
          className={classes.TextField}
          margin="normal"
        />
      </div>
      <TextField
        id="message"
        label="Message"
        multiline
        rows="6"
        margin="normal"
      />
      {/* <Button
        variant="raised"
        color="primary"
        size="medium"
        style={{ width: "calc(50% - 20px)", margin: "20px 0" }}
      /> */}
      <ButtonSvg>Send Message</ButtonSvg>
    </form>
  </div>
);

export default ContactUs;
