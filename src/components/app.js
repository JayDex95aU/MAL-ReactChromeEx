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
        this.setState({ log: 'Logout' });
      } else {
        this.setState({ log: 'Sign-in' });
      }
    });

    if (this.state.log == 'Logout') {
      return (
        <Link className="item" onClick={this.logoutHelper}>{this.state.log}</Link>
      );
    }

    return (
      <Link to="login" className="item">{this.state.log}</Link>
    );
  }

  render() {
    return(
      <div>
        <header>
          <div className="ui top fixed menu">
            <div className="item">
              <img src="/img/logo.png" />
            </div>
            <div className="right menu">
              {this.logRender()}
              <a className="item">
                <i className="setting icon"></i>
              </a>
            </div>
          </div>
        </header>

        <div className="main_headerpadding container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
