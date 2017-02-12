import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReactScrollbar from 'react-scrollbar-js';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);
  }



  renderSuggestionsMapper(data) {
    //data.image_url data.name
    return(

      <li>
        <div className="divider divider-magin"/>
        <div className="row">
          <img className="col s3 suggestion_list" src={data.image_url} />
          <p className="col s5 paragraph_style">{data.name}</p>
          <div className="col s4">
            <a className="btn">YES</a>
            <a className="btn red">_NO</a>
          </div>
        </div>

      </li>
    );
  }



  render() {
    const myScrollbar = {
      width: 275,
      height: 398,
    };

    console.log(this.props.suggestion);

    return(
      <ReactScrollbar style={myScrollbar}>
        <h6>Did you watch?</h6>
        <ul>
          {this.props.suggestion.map(this.renderSuggestionsMapper)}
        </ul>
      </ReactScrollbar>
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
