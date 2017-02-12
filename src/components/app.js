import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { log: ''}
    this.logoutHelper = this.logoutHelper.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  logoutHelper() {
    chrome.storage.local.set({'username_MAL_95au': ''});
    chrome.storage.local.set({'password_MAL_95au': ''});
    Materialize.toast('You have logged out', 4000);
  }

  logRender() {
    chrome.storage.local.get('username_MAL_95au', (data) => {
      if (data.username_MAL_95au != '') {
        this.setState({ log: 'LOGOUT' });
      } else {
        this.setState({ log: 'LOGIN' });
      }
    });

    if (this.state.log == 'LOGOUT') {
      return (
        <ul id="nav-mobile" className="right">
          <li><Link onClick={this.logoutHelper}>{this.state.log}</Link></li>
        </ul>
      );
    }

    return (
      <ul id="nav-mobile" className="right">
        <li><Link to="login">{this.state.log}</Link></li>
      </ul>
    );
  }

  render() {
    return(
      <div>
        <header>
          <div className="navbar-fixed">
            <nav>
              <div className="nav-wrapper indigo">
                <a className="brand-logo left"><i className="material-icons">cloud</i>MAL</a>
                {this.logRender()}
              </div>
            </nav>
          </div>
        </header>

        <main>{this.props.children}</main>

      </div>
    );
  }
}

export default App;
