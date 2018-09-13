import React, { PureComponent } from "react";
// import { dbStore } from "../../../../firebase/firebase";
// import { storage } from "../../../../firebase/firebase";
//mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
//icons
import FileUpload from "@material-ui/icons/FileUpload";
import classes from "./AccountPage.module.css";
//query

class EditProfile extends PureComponent {
  state = {
    username: "",
    email: "",
    role: "",
    name: "",
    surname: "",
    phone: "",
    imageURL: "",
    filename: "",
    loading: false,
    disabled: false
  };
  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile) {
      this.setState({ ...this.props.profile });
    }
  }

  firestoreHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });

    const data = {
      [this.props.user.uid]: {
        username: this.state.username,
        email: this.state.email,
        role: this.state.role,
        name: this.state.name,
        surname: this.state.surname,
        phone: this.state.phone,
        imageURL: this.state.imageURL,
        disabled: true
      }
    };

    dbStore
      .collection("userbase")
      .doc("users")
      .update(data)
      .then(() => {
        this.setState({
          ...data[this.props.user.uid],
          loading: false,
          disabled: true
        });
        alert("Success");
      })
      .catch(function(error) {
        console.error("Error updating field: ", error);
      });
  };

  handleChange = name => event => {
    if (name === "name" || name === "surname" || name === "phone") {
      this.setState({ [name]: event.target.value });
    } else if (event.target.type === "file") {
      const {
        target: { files }
      } = event;
      const filename = this.state.username + "_avatar";
      const file = files[0];
      storage
        .ref("users")
        .child(filename)
        .put(file)
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log("File available at", downloadURL);
            if (downloadURL) {
              this.setState({ imageURL: downloadURL, filename: filename });
            }
          });
        });
    }
  };

  render() {
    console.log(this)
    let form = (
      <form
        onSubmit={event => this.firestoreHandler(event)}
        className={this.state.loading ? classes.loading : null}
      >
        <TextField
          margin="normal"
          id="name"
          label="Name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange("name")}
        />
        <TextField
          margin="normal"
          id="surname"
          label="Surname"
          type="text"
          value={this.state.surname}
          onChange={this.handleChange("surname")}
        />
        <TextField
          margin="normal"
          id="phone"
          label="Phone"
          type="text"
          value={this.state.phone}
          onChange={this.handleChange("phone")}
        />
        <input
          accept="image/*"
          className={classes.hideInput}
          id="uploadImage"
          multiple
          type="file"
          onChange={this.handleChange()}
        />
        <React.Fragment>
          <div
            className={classes.imageContainer}
            style={{ backgroundImage: `url(${this.state.imageURL})` }}
          />
          <label htmlFor="uploadImage">
            <Button variant="raised" component="span">
              Upload Image
              <FileUpload className={classes.rightIcon} />
              {/* <label htmlFor="uploadImage" /> */}
            </Button>
            <span style={{ marginLeft: "8px" }}>
              {this.state.filename ? this.state.filename : null}
            </span>
          </label>
        </React.Fragment>

        <Button variant="raised" color="primary" type="submit" fullWidth>
          Update
        </Button>
      </form>
    );

    return (
      <div className={classes.formWrapper}>
        {form}
        {this.state.loading ? (
          <div className={classes.loadingWrapper}>
            <CircularProgress size={50} color="secondary" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default EditProfile;
