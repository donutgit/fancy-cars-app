import React, { PureComponent } from "react";
import axios from "axios";
import { Mutation } from "react-apollo";
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
import FileCopy from "@material-ui/icons/FileCopy";
import AuthContext from "../../../../hoc/AuthContext";
import classes from "./AddCarFrom.module.css";
import {
  ADD_CAR,
  UPDATE_CAR,
  GET_CARS_NOMINATIONS
} from "../../../../apollo/queries";

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

const INIT_FROMDATA = {
  mark: "",
  model: "",
  description: "Blank",
  nominations: ["Design", "Price / Quality"],
  premium: false,
  votes: 1000,
  filename: "",
  imageUrl:
    "https://res.cloudinary.com/dxfogjj18/image/upload/f_auto/v1534421906/pkp1db9osg2qgqcoe0a6.png"
};

class AddCarForm extends PureComponent {
  state = {
    formData: {
      ...INIT_FROMDATA
    },
    filename: "",
    loading: false,
    error: true
  };
  componentDidMount() {
    if (!this.props.formData) {
      this.setState({
        formData: {
          ...INIT_FROMDATA,
          votes: Math.floor(Math.random() * (10000 - 1000)) + 1000
        }
      });
    } else {
      const formData = { ...this.props.formData };
      this.setState({
        formData: {
          ...formData,
          votes: Math.floor(Math.random() * (10000 - 1000)) + 1000
        }
      });
    }
  }

  onformSubmit = (event, mutation, role) => {
    event.preventDefault();
    if (role !== "Administrator") {
      console.log("Permission denied");
      return false;
    }
    if (this.props.formData) {
      const { formData } = this.state;
      mutation({
        variables: {
          id: this.props.formData.id,
          mark: formData.mark,
          model: formData.model,
          nominations: formData.nominations,
          votes: formData.votes,
          premium: formData.premium,
          imageUrl: formData.imageUrl
        }
      }).then(res => console.log(res));
      this.props.onClose();
    } else {
      const { formData } = this.state;
      mutation({
        variables: {
          mark: formData.mark,
          model: formData.model,
          nominations: formData.nominations,
          votes: formData.votes,
          premium: formData.premium,
          imageUrl: formData.imageUrl
        }
      }).then(res => console.log(res));
      this.props.onClose();
    }
  };

  handleChange = name => event => {
    const { value } = event.target;
    if (event.target.name === "nominations") {
      this.setState(({ formData }) => {
        const nextData = {
          ...formData,
          [name]: value
        };
        return { formData: nextData };
      });
    } else if (event.target.type === "text") {
      this.setState(({ formData }) => {
        const nextData = {
          ...formData,
          [name]: value
        };
        return { formData: nextData };
      });
    } else if (event.target.type === "checkbox") {
      this.setState(({ formData }) => {
        const nextData = {
          ...formData,
          [name]: value
        };
        return { formData: nextData };
      });
    } else if (event.target.type === "file") {
      // console.log(event.target.files);
      const {
        target: { files }
      } = event;
      const file = files[0];
      var formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "hhj796ue");
      axios
        .post(
          `https://api.cloudinary.com/v1_1/dxfogjj18/image/upload`,
          formData
        )
        .then(res => {
          if (res.status === 200) {
            this.setState(({ formData }) => {
              const nextData = {
                ...formData,
                imageUrl: res.data.url
              };
              return { formData: nextData };
            });
          } else console.log("Error! Image wasnt uploaded");
        });
    }
  };

  render() {
    const { formData } = this.state;

    return (
      <div className={classes.formWrapper}>
        <Mutation
          mutation={this.props.formData ? UPDATE_CAR : ADD_CAR}
          refetchQueries={[{ query: GET_CARS_NOMINATIONS }]}
        >
          {mutation => {
            return (
              <AuthContext.Consumer>
                {({ user: { role } }) => (
                  <form
                    onSubmit={event => this.onformSubmit(event, mutation, role)}
                    className={this.state.loading ? classes.loading : null}
                  >
                    <FormControl>
                      <InputLabel htmlFor="select-multiple-checkbox">
                        Nominations
                      </InputLabel>
                      <Select
                        multiple
                        name="nominations"
                        value={formData.nominations}
                        onChange={this.handleChange("nominations")}
                        input={<Input id="select-multiple-checkbox" />}
                        renderValue={selected => selected.join(", ")}
                        // MenuProps={MenuProps}
                      >
                        {nominations.map(nom => (
                          <MenuItem key={nom} value={nom}>
                            <Checkbox
                              checked={formData.nominations.indexOf(nom) > -1}
                            />
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
                      value={formData.mark}
                      onChange={this.handleChange("mark")}
                    />
                    <TextField
                      margin="normal"
                      id="model"
                      label="Model"
                      type="text"
                      value={formData.model}
                      onChange={this.handleChange("model")}
                    />
                    <TextField
                      margin="normal"
                      id="description"
                      label="Description"
                      type="text"
                      multiline
                      rowsMax="4"
                      value={formData.description}
                      onChange={this.handleChange("description")}
                    />
                    <Checkbox
                      checked={formData.premium}
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
                      value={formData.votes}
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
                        style={{ backgroundImage: `url(${formData.imageUrl})` }}
                      />
                      <label htmlFor="uploadImage">
                        <Button variant="raised" component="span">
                          Upload Image
                          <FileCopy className={classes.rightIcon} />
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
                      disabled={!formData.imageUrl}
                      fullWidth
                    >
                      {this.props.formData ? "Edit car" : "Add new car"}
                    </Button>
                  </form>
                )}
              </AuthContext.Consumer>
            );
          }}
        </Mutation>
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
