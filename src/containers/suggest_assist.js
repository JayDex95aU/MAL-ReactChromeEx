import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);
  }



  renderSuggestionsMapper(data) {
    return(
      <tr key={data.id}>
        <p>{data.id}</p>
      </tr>
    );
  }


  render() {
    return(
      <div className="test">
        <table className="table">

        <tbody>
            {this.props.suggestion.map(this.renderSuggestionsMapper)}
        </tbody>

        </table>
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
