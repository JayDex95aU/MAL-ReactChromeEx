import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);
    this.logoutHelper = this.logoutHelper.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  renderSuggestionsMapper() {
    // Map a list of anime suggestions to an object
  }

  logoutHelper() {
    chrome.storage.local.set({'username_MAL_95au': ''});
    chrome.storage.local.set({'password_MAL_95au': ''});
    this.context.router.push('/');
  }

  render() {

    return(
      <div className="test">
        <h1>Hello World</h1>
        <button onClick={this.logoutHelper} className="btn">Logout</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { suggestion: state.suggestion };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAssist);
