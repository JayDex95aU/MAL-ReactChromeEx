import { TAB_SUGGESTION, REMOVE_ANIME } from '../actions/index';
import axios from 'axios';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  var preventAdd = false;

  switch(action.type[0]) {
    case TAB_SUGGESTION:
      const animeInfo = animeInfoHelper(action.payload.data);
      state.map((value) => {
        if (value.info.id == animeInfo.id) {
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
        return state;
      }
      console.log("Anime not in state");
      console.log(state.length);
      if (state.length > 0) {
        chrome.browserAction.setBadgeText({text: `${state.length + 1}`});
      } else {
        chrome.browserAction.setBadgeText({text: "1"});
      }
      return [ {info: animeInfo, ep: action.type[1]}, ...state ];

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
