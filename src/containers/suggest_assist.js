import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SuggestAssist extends Component {
  constructor(props) {
    super(props);
  }

  renderSuggestions() {
    // Map a list of anime suggestions to an object
  }

  render() {
    console.log(this.props.suggestion);
    return(
      <div className="test">
        <h1>Hello World "New WEB"</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { suggestion: state.suggestion };
}

export default connect(mapStateToProps)(SuggestAssist);
