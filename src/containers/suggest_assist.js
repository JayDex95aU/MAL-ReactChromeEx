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

  animeAdd(data) {
    $(`.card${data.id}`).transition('scale');
    noty({
      text: `${data.name} has been added`,
      layout: 'bottomLeft',
      theme: 'relax',
      type: 'success',
      timeout: 750,
      closeWith: ['hover']
    });
    return;
  }

  animeRemove(data) {
    $(`.card${data.id}`).transition('scale');
    return;
  }


  renderSuggestionsMapper(data) {
    return(
      <div className={`container ui card cardCentering card${data.info.id}`} key={data.info.id}>
        <div className="content">
          <img className="right floated mini ui image" src={data.info.image_url}/>
          <div className="header">
            {data.info.name}
          </div>
          <div className="meta">
            {data.info.payload.status} | <i className="star icon"></i>
            {data.info.payload.score}
          </div>

          <div className="description">
            Episode: <div className="ui mini input"><input type="text" defaultValue={data.ep} /></div>
          </div>

        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div onClick={() => {this.animeAdd(data.info)}} className="ui basic green button">Add</div>
            <div onClick={() => {this.animeRemove(data.info)}} className="ui basic red button">Ignore</div>
          </div>
        </div>
      </div>
    );
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

    if (this.props.suggestion.length < 1) {
      return (
        <div className="ui icon centered message container">
          <i className="inbox icon"></i>
          <div className="content">
            <div className="header">
              No Anime Suggestions
            </div>
            <p>Go visit your favourite anime sites to easily add your recently watched anime to MAL in just a click.</p>
          </div>
        </div>

      );
    }

    return(
    <div>
      <ReactScrollbar style={myScrollbar}>
        {this.props.suggestion.map(this.renderSuggestionsMapper, this)}
      </ReactScrollbar>
      <div onClick={() => {this.setState({ clear: true })}} className="ui bottom attached button" tabIndex="0">Clear All</div>
      {this.clearHelper()}
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { suggestion: state.suggestion};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { addAnimeToMAL: addAnimeToMAL } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAssist);
