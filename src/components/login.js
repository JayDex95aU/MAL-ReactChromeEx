import React, { Component } from 'react';
import { Link } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="d-flex flex-column justify-content-end align-items-center">
        <br />
        <h3 className="text-center"><small>Please Login</small></h3>
      </div>
    );
  }
}


export default Login;
