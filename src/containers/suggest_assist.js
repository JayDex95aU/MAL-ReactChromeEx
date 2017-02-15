import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAnimeToMAL, removeAnimeSuggestion, specialgetUserAnime } from '../actions/index';
import noty from 'noty';
import axios from 'axios';

import ReactScrollbar from 'react-scrollbar-js';

class SuggestAssist extends Component {
  constructor(props) {
    super(props);

    this.animeAdd = this.animeAdd.bind(this);

    this.state = { clear: false, loadbutton: false };
  }

  animeAdd(info, ep) {
    console.log(this.props.loginDetails);
    if (!this.props.loginDetails.username) {
      noty({
        text: `Please Login to Add Anime`,
        layout: 'bottomLeft',
        theme: 'relax',
        type: 'success',
        timeout: 1500,
        closeWith: ['hover']
      });
      return;
    }

    console.log("Hello World");

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
      "username": `${this.props.loginDetails.username}`,
      "password": `${this.props.loginDetails.password}`,
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
        const request = axios({
          method: 'get',
          url: `https://myanimelist.net/malappinfo.php?u=${this.props.loginDetails.username}&status=all&type=anime`
        }).then((data) => {
          this.props.specialgetUserAnime(data);
        });
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
    $(`.card${info.id}`).transition('scale');
    setTimeout(() => {
      this.props.removeAnimeSuggestion(info.id);
    }, 150);
    return;
  }

  labelRenderHelper(data) {
    if (data == 'New') {
      return ("New Series");
    } else if (data == "Update") {
      return ("Update");
    }
  }

  labelRenderHelperRewatch(data) {
    console.log(data);
    if (parseInt(data.watched_ep) == parseInt(data.series_ep)) {
      return(
        <a className="ui mini label">Series Completed</a>
      );
    }
  }

  labelRenderHelperRewatchEp(data) {
    if (data.status == "New") {
      return (
        <a className="ui mini label">Add to MAL?</a>
      );
    }
    if (data.series_ep == '?') {
      return(
        <a className="ui mini label">Unknown Ep Length</a>
      );
    } else {
      return(
        <a className="ui mini label">{data.series_ep} Episodes Long</a>
      );
    }
  }

  renderSuggestionsMapper(data) {
    if (data.status == "Rewatching") {
      return (
        <div className={`container ui card cardCentering card${data.info.id}`} key={data.info.id}>
          <div className="content">
            <img className="right floated mini ui image" src={data.info.image_url}/>
            <div className="header">{data.info.name}</div>
            <div className="meta">
              <a className="ui mini label">Rewatching</a>
              {this.labelRenderHelperRewatch(data)}
              {this.labelRenderHelperRewatchEp(data)}
            </div>
            <div className="description">You're rewatching episode {data.ep}</div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <div onClick={() => {this.animeRemove(data.info)}} className="ui basic teal button">Okay, that's cool</div>
            </div>
          </div>
      </div>
      );
    }

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
            {/* {data.info.payload.status} |  */}
            <a className="ui mini label">
               {this.labelRenderHelper(data.status)}
            </a>
            {this.labelRenderHelperRewatchEp(data)}
            <i className="star icon"></i>{data.info.payload.score}
          </div>

          <div className="description">
            Did you watch Episode: {data.ep}
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
  return { suggestion: state.suggestion, loginDetails: state.login, useranime: state.useranime };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { addAnimeToMAL, removeAnimeSuggestion, specialgetUserAnime } , dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SuggestAssist);
