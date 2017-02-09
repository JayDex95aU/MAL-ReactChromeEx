import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return(
      <div className="test">
        <h1>Hello World 2</h1>
        <Link to="/" className="btn btn-danger">Test</Link>
      </div>
    );
  }
}

export default App;
