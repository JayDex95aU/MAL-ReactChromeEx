import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-light bg-faded">
          <a className="navbar-brand display-1">
            <img src="./img/MAL_logo.png" width="30" height="30" className="rounded float-left" alt="" />
            Title Here
          </a>
        </nav>
        <div className="container">
        {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
