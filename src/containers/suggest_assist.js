import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAnimeToMAL, removeAnimeSuggestion } from '../actions/index';
import noty from 'noty';
import axios from 'axios';

import ReactScrollbar from 'react-scrollbar-js';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);

    this.animeAdd = this.animeAdd.bind(this);

    this.state = { clear: false, loadbutton: false };
  }

  animeAdd(info, ep, username, password) {
    this.setState({ loadbutton: true });
    var myXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
      "<entry>" +
      `<episode>${ep}</episode>` +
      "<status>1</status>" +
      "<score></score>" +
      "<storage_type></storage_type>" +
      "<storage_value></storage_value>" +
      "<times_rewatched></times_rewatched>" +
      "<rewatch_value></rewatch_value>" +
      "<date_start></date_start>" +
      "<date_finish></date_finish>" +
      "<priority></priority>" +
      "<enable_discussion></enable_discussion>" +
      "<enable_rewatching></enable_rewatching>" +
      "<comments></comments>" +
      "<tags></tags>" +
      "</entry>";

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": `https://myanimelist.net/api/animelist/add/${info.id}.xml`,
      "method": "POST",
      "username": "JayDex",
      "password": "95life95aU",
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "data": {
        "data": myXML
      }
    }

  $.ajax(settings).done((response) => {
      this.setState({ loadbutton: false });
      if (response == "Created") {
        this.props.removeAnimeSuggestion(info.id);
        $(`.card${info.id}`).transition('scale');
        noty({
          text: `${info.name} has been added`,
          layout: 'bottomLeft',
          theme: 'relax',
          type: 'success',
          timeout: 1500,
          closeWith: ['hover']
        });
      }
    }).fail((err) => {
      this.setState({ loadbutton: false });
      noty({
        text: `ERROR: Anime couldn't be added to your list`,
        layout: 'bottomLeft',
        theme: 'relax',
        type: 'error',
        timeout: 1500,
        closeWith: ['hover']
      });
    });
    return;
  }

  animeRemove(info) {
    this.props.removeAnimeSuggestion(info.id);
    $(`.card${data.id}`).transition('scale');
    return;
  }


  renderSuggestionsMapper(data) {
    return(
      <div className={`container ui card cardCentering card${data.info.id}`} key={data.info.id}>
        <div className="content">
          <img className="right floated mini ui image" src={data.info.image_url}/>
          <a href="#" className="header">
            <div onClick={() => {
                chrome.tabs.create({url: `${data.info.url}`});
              }}>{data.info.name}</div>
          </a>
          <div className="meta">
            {data.info.payload.status} | <i className="star icon"></i>
            {data.info.payload.score}
          </div>

          <div className="description">
            Did you watch Episode: {data.ep} ?
            {/* <div className="ui mini input"><input type="text" defaultValue={data.ep} /></div> */}
          </div>

        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <div onClick={() => {this.animeAdd(data.info, data.ep)}} className={`ui basic green button ${this.state.loadbutton ? 'loading' : ''}`}>Yes</div>
            <div onClick={() => {this.animeRemove(data.info)}} className="ui basic red button">No</div>
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
  return bindActionCreators( { addAnimeToMAL, removeAnimeSuggestion } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAssist);
