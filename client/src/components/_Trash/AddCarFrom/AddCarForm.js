import React, { PureComponent } from "react";
// import axios from "axios";
import { v4 as generateRandomID } from "uuid";
import { dbStore, storage } from "../../../firebase/firebase";
// import PropTypes from "prop-types";
//mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
//icons
import FileUpload from "@material-ui/icons/FileUpload";

import classes from "./AddCarFrom.css";

const nominations = [
  "Small Class",
  "Economy",
  "Compact",
  "Buisness",
  "Lux",
  "Coupe / Sport",
  "Electric / Hybrid",
  "Crossover",
  "SUV",
  "Design",
  "Price / Quality",
  "Best Crossover / SUV 2018",
  "Best Car 2018"
];

const INIT_STATE = {
  mark: "",
  model: "",
  description: "Blank",
  premium: false,
  imageUrl:
    "https://firebasestorage.googleapis.com/v0/b/autoroku-793ef.appspot.com/o/assets%2Fplaceholder.png?alt=media&token=8adc19ca-c273-418c-a738-dd567102fc9e",
  filename: ""
};

class AddCarForm extends PureComponent {
  state = {
    ...INIT_STATE,
    nominations: ["Design", "Price / Quality"],
    votes: 1000,
    filename: "",
    loading: false,
    error: true
  };
  componentDidMount() {
    if (this.props.type === "add") {
      this.setState({
        ...INIT_STATE,
        votes: Math.floor(Math.random() * (10000 - 1000)) + 1000
      });
    } else if (this.props.type === "edit") {
      const state = { ...this.props.formData };
      this.setState({
        ...state,
        votes: Math.floor(Math.random() * (10000 - 1000)) + 1000
      });
    }
  }
  firestoreHandler = (event, type) => {
    event.preventDefault();
    if (this.props.role === "Administrator") {
      this.setState({ loading: true });
      let id = null;
      if (type === "add") {
        id = generateRandomID();
      } else if (type === "edit") {
        id = this.state.id;
      }
      const { nominations, mark, model, imageUrl, premium, votes } = this.state;

      const data = {
        [id]: {
          id,
          nominations,
          mark,
          model,
          imageUrl,
          premium,
          votes
        }
      };

      dbStore
        .collection("poll")
        .doc("cars")
        .update(data)
        .then(res => {
          if (type === "edit") {
            console.log(`${mark} ${model} successfully updated!`);
            this.setState({ loading: false });
            this.props.close();
          } else {
            console.log(`${mark} ${model} successfully added to list!`);
            this.setState({
              ...INIT_STATE,
              votes: Math.floor(Math.random() * (10000 - 1000)) + 1000,
              loading: false
            });
          }
        })
        .catch(function(error) {
          console.error("Error updating field: ", error);
        });
    } else alert("Access denied");
  };

  handleChange = name => event => {
    if (event.target.name === "nominations") {
      this.setState({
        [name]: event.target.value
      });
    } else if (event.target.type === "text") {
      this.setState({
        [name]: event.target.value
      });
    } else if (event.target.type === "checkbox") {
      this.setState({
        [name]: event.target.checked
      });
    } else if (event.target.type === "file") {
      // console.log(event.target.files);
      const {
        target: { files }
      } = event;
      const filename = this.state.mark + "_" + this.state.model;
      const file = files[0];
      var formData = new FormData();
      formData.append("image", file);

      // axios
      //   .post("http://localhost:3001/upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data"
      //     }
      //   })
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err));
      storage
        .ref("cars/lg")
        .child(filename)
        .put(file)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(url => {
          this.setState({ imageUrl: url, filename: filename });
        });
    }
  };

  render() {
    let form = (
      <form
        onSubmit={event => this.firestoreHandler(event, this.props.type)}
        className={this.state.loading ? classes.loading : null}
      >
        <FormControl>
          <InputLabel htmlFor="select-multiple-checkbox">
            Nominations
          </InputLabel>
          <Select
            multiple
            name="nominations"
            value={this.state.nominations}
            onChange={this.handleChange("nominations")}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            // MenuProps={MenuProps}
          >
            {nominations.map(nom => (
              <MenuItem key={nom} value={nom}>
                <Checkbox checked={this.state.nominations.indexOf(nom) > -1} />
                <ListItemText primary={nom} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          id="mark"
          label="Mark"
          type="text"
          value={this.state.mark}
          onChange={this.handleChange("mark")}
        />
        <TextField
          margin="normal"
          id="model"
          label="Model"
          type="text"
          value={this.state.model}
          onChange={this.handleChange("model")}
        />
        <TextField
          margin="normal"
          id="description"
          label="Description"
          type="text"
          multiline
          rowsMax="4"
          value={this.state.description}
          onChange={this.handleChange("description")}
        />
        <Checkbox
          checked={this.state.premium}
          id="premium"
          onChange={this.handleChange("premium")}
          value="premium"
          color="primary"
        />
        <TextField
          margin="normal"
          id="votes"
          label="Votes"
          type="text"
          value={this.state.votes}
          // onChange={this.handleChange("votes")}
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
            style={{ backgroundImage: `url(${this.state.imageUrl})` }}
          />
          <label htmlFor="uploadImage">
            <Button
              variant="raised"
              component="span"
              disabled={this.state.mark && this.state.model ? false : true}
            >
              Upload Image
              <FileUpload className={classes.rightIcon} />
              {/* <label htmlFor="uploadImage" /> */}
            </Button>
            <span style={{ marginLeft: "8px" }}>
              {this.state.filename ? this.state.filename : null}
            </span>
          </label>
        </React.Fragment>

        <Button
          variant="raised"
          color="primary"
          type="submit"
          disabled={!this.state.imageUrl}
          fullWidth
        >
          {this.props.type === "edit" ? "Edit car" : "Add new car"}
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

export default AddCarForm;
