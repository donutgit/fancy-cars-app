import React from 'react'
import ReactDOM from 'react-dom'
import Button from "material-ui/Button";
import _ from 'lodash';


const defaultProps = {
  label: 'Upload image',
  multi: false,
  accept: null,
  passBase64: false
}

export default class Component extends React.Component {

  openFileDialog () {
    var fileInputDom = ReactDOM.findDOMNode(this.refs.input)
    fileInputDom.click()
  }

  handleFile (event) {
    _.keys(event.target.files).map((index) => {
      const file = event.target.files[index]

      if (this.props.passBase64) {
        const reader = new FileReader()
        reader.onload = (upload) => {
          const base64 = upload.target.result
          this.props.onUpload(file, base64)
        }

        reader.readAsDataURL(file)
      } else {
        this.props.onUpload(file)
      }
    })
  }

  render () {
    return (
      <div>
        <Button
          variant="raised"
          color="primary"
          label={this.props.label}
          onClick={this.openFileDialog.bind(this)} />
        <input
          type='file'
          multiple={this.props.multi}
          ref='input'
          style={{ display: 'none' }}
          accept={this.props.accept}
          onChange={this.handleFile.bind(this)} />
      </div>
    )
  }

}

Component.defaultProps = defaultProps