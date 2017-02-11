import React, { Component } from 'react';
import { Link } from 'react-router';

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="d-flex flex-column justify-content-end align-items-center">
        <br/>
        <h3 className="text-center"><small>Hello there, you're not signed in, please sign in to MAL</small></h3>
        <br/>
        <Link to="/login" className="btn btn-primary col-md-4 col-md-offset-4">Sign-in</Link>
      </div>
    );
  }
}


export default Landing;
