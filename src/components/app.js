import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render() {
    return(
      <div>
        <header>

          <ul id="dropdown1" className="dropdown-content">
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li className="divider"></li>
            <li><a href="#!">three</a></li>
          </ul>

          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper indigo">
                <a className="brand-logo"><i className="material-icons">cloud</i>MAL</a>
              </div>
            </nav>
          </div>
        </header>

        <main className="container">{this.props.children}</main>

      </div>
    );
  }
}

export default App;
