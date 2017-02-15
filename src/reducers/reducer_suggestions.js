import { TAB_SUGGESTION, REMOVE_ANIME, LOGIN_UPDATE_EXISTING_SUGGESTIONS } from '../actions/index';
import axios from 'axios';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  var preventAdd = false;

  switch(action.type[0]) {
    case LOGIN_UPDATE_EXISTING_SUGGESTIONS:
      var i;
      var g;

      for (i = 0; i < state.length; i++) {
        for (g = 0; g < action.payload.length; g++) {
          if (state[i].info.id == action.payload[g].series_animedb_id) {

            if (state[i].ep <= action.payload[g].my_watched_episodes) {
              state[i].status = "Rewatching"
            } else {
              state[i].status = "Update"
            }
            state[i].watched_ep = action.payload[g].my_watched_episodes;
            if (action.payload[g].series_episodes == "0") {
              state[i].series_ep = '?';
            } else {
              state[i].series_ep = action.payload[g].series_episodes;
            }
          }
        }
      }
      console.log(state);
      return [ ...state];
    case TAB_SUGGESTION:
      const useranime = action.type[2];
      const animeInfo = animeInfoHelper(action.payload.data);
      var status = 'New';
      var series_ep = '?';
      var my_watched_episodes = '';
      var i;
      for (i = 0; i < useranime.length; i++) {
        if (animeInfo.id == useranime[i].series_animedb_id) {

          if (parseInt(useranime[i].my_watched_episodes) >= parseInt(action.type[1])) {
            my_watched_episodes = useranime[i].my_watched_episodes;
            if (useranime[i].series_episodes != "0") {
              series_ep = useranime[i].series_episodes;
            }
            status = "Rewatching";
            break;
          }
          status = "Update";
          console.log(useranime[i]);
          // console.log(useranime[i].series_episodes);
          if (useranime[i].series_episodes != "0") {
            series_ep = useranime[i].series_episodes;
          }
          my_watched_episodes = useranime[i].my_watched_episodes;
        }
      }

      state.map((value) => {
        if (value.info.id == animeInfo.id) {
          value.status = status;
          value.series_ep = series_ep;
          value.watched_ep = my_watched_episodes;
          preventAdd = true;

          console.log("Anime in state");

          if (!isNaN(action.type[1])) {
            if (action.type[1] > value.ep) {
              value.ep = action.type[1];
            }
          }
        }
      })

      if (preventAdd) {
        return [ ...state];
      }
      console.log("Anime not in state");
      if (state.length > 0) {
        chrome.browserAction.setBadgeText({text: `${state.length + 1}`});
      } else {
        chrome.browserAction.setBadgeText({text: "1"});
      }
      return [ {info: animeInfo, ep: action.type[1], status: status, series_ep: series_ep, watched_ep: my_watched_episodes}, ...state ];

    case REMOVE_ANIME:
      var i;

      for (i = 0; i < state.length; i++) {
        if (state[i].info.id == action.id) {
          state.splice(i, 1);
          break;
        }
      }
      chrome.browserAction.setBadgeText({text: `${state.length}`});
      return [ ...state ];
    default:
      return state;
  }
}

/**
Purpose: Select correct category when JSON data is returned from MAL
**/
function animeInfoHelper(data) {
  var selectionValue = 0;
  while (data.categories[selectionValue].type != "anime") {
    selectionValue++;
  }
  const animeInfo = data.categories[selectionValue].items[0];
  return animeInfo;
}


//const parser = new x2js();
//console.log(parser.xml2js(action.payload.data).anime);

//console.log(action.payload.data.categories[0].type); HOW TO CHECK IF ANIME OR NOT
