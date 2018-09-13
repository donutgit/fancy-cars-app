import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";
import { storage } from "../../firebase/firebase";

class CustomFileUpload extends Component {
  state = {
    username: "",
    avatar: "",
    isUploading: false,
    progress: 0,
    avatarURL: ""
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    storage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  handleDeleteFile = imageUrl => {
    storage
      .ref().child(imageUrl).delete().then(resp => console.log(resp))
  };


  handleCustomUpload = file => {
    storage.ref().child('images/image01.jpg').put(file)
  }
  handleFileSelection = event => {
    const { target: { files } } = event;
    console.log(files);
    this.handleCustomUpload(files[0]);
  }
  // onChangeHandler = event => {
  //   //console.log(event.target.value);
  //   storage
  //     .ref("images")
  //     .child(filename)
  //     .getDownloadURL();
  //   // this.setState({file: event.target.flles[0]})
  // };

  render() {
    //const imageUrl = 'images/89fa0816-b482-4260-bfa6-e0789a896927.jpg';
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} alt="wat" />}
          <FileUploader
            accept="image/*"
            name="avatar"
            filename={this.props.filename}
            storageRef={storage.ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
        </form>
        {/* <form>
          <input type="file" onChange={this.handleFileSelection}/>
          <button type="button" >upluad</button>
        </form> */}
      </div>
    );
  }
}

export default CustomFileUpload;
