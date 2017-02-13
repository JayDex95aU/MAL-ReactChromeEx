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

    this.state = { clear: false };
  }

  animeHelper(data) {
    return;
  }


  renderSuggestionsMapper(data) {
    return(
      <div className="container ui card cardCentering">
        <div className="content">
          <img className="right floated mini ui image" src={data.image_url}/>
          <div class="header">
            {data.name}
          </div>
          <div className="meta">
            {data.payload.status} | <i className="star icon"></i>
            {data.payload.score}
          </div>

          <div className="description">
            Episode Watched: 8
          </div>

        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div className="ui basic green button">Add</div>
            <div className="ui basic red button">Ignore</div>
          </div>
        </div>
      </div>
    );
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

  clearHelper() {
    if (this.state.clear) {
      return(
        <div className="ui active inverted dimmer">
          <div className="ui indeterminate text loader">Clearing</div>
        </div>
      );
    }
  }

  render() {
    const myScrollbar = {
      width: "100%",
      height: 425,
    };
    return(
    <div>
      <ReactScrollbar style={myScrollbar}>
        {this.props.suggestion.map(this.renderSuggestionsMapper, this)}
      </ReactScrollbar>
      <div onClick={() => {this.setState({ clear: true })}} className="ui bottom attached button" tabindex="0">Clear All</div>
      {this.clearHelper()}
    </div>
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
