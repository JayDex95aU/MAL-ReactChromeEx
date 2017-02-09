import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SuggestAssist extends Component {
  render() {
    console.log(this.props.post);
    return(
      <div className="test">
        <h1>Hello World "New WEB"</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { };
}

export default connect(mapStateToProps)(SuggestAssist);
