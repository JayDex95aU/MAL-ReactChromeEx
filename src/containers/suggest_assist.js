import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAnimeToMAL } from '../actions/index';
import noty from 'noty';


import ReactScrollbar from 'react-scrollbar-js';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);
  }

  animeHelper(data) {
    return;
  }


  renderSuggestionsMapper(data) {
    return(<div><h2>{data.name}</h2></div>);
    //data.image_url data.name
    // return(
    //   {data.name}
    //   //
    //   // <li key={data.id}>
    //   //   <div className="divider divider-magin"/>
    //   //   <div className="row">
    //   //     <img className="col s3 suggestion_list" src={data.image_url} />
    //   //     <p className="col s5 paragraph_style">{data.name}</p>
    //   //     <div className="col s4">
    //   //       <button onClick={() => {
    //   //           this.props.addAnimeToMAL(data.id);
    //   //         }} className="btn">YES</button>
    //   //       <button className="btn red">_NO</button>
    //   //     </div>
    //   //   </div>
    //   //
    //   // </li>
    // );
  }

  notify() {
    noty({
      text: 'Debug',
      layout: 'bottomCenter',
      progressBar: 'true',
      theme: 'relax',
      type: 'information',
      timeout: 1500,
    });
  }

  render() {
    const myScrollbar = {
      width: "100%",
      height: 425,
    };
    return(
      <ReactScrollbar style={myScrollbar}>
        {this.props.suggestion.map(this.renderSuggestionsMapper, this)}
      </ReactScrollbar>
    );
  }
}

function mapStateToProps(state) {
  return { suggestion: state.suggestion };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { addAnimeToMAL: addAnimeToMAL } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAssist);
