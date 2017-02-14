import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import noty from 'noty';
import { clearDetailsInReducer } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { log: '' }
    this.logoutHelper = this.logoutHelper.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  logoutHelper() {
    this.props.clearDetailsInReducer();
    chrome.storage.local.clear();
    noty({
      text: `<h5>Logout</h5><p>Thank you for using AutoMAL</p>`,
      layout: 'bottomLeft',
      theme: 'relax',
      type: 'information',
      timeout: 1500,
      closeWith: ['hover']
    });
  }

  logRender() {
    chrome.storage.local.get({username_MAL_95au: ''}, (data) => {
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

function mapStateToProps(state) {
  return { loginDetails: state.login };
}

export default connect(mapStateToProps, {clearDetailsInReducer})(App);
