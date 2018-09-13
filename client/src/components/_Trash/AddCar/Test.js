import React, { Component } from 'react';

class Test extends Component {
  state = {
    fuck: false
  }
  render() {
    console.log('[TEST]')
    return (
      <div>
        <h1>{this.props.model}</h1>
        <button onClick={this.props.click}>Click</button>
      </div>
    );
  }
}

export default Test;
