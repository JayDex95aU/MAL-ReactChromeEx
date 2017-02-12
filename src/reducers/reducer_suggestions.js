import { TAB_SUGGESTION } from '../actions/index';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  var preventAdd = false;

  switch(action.type) {
    case TAB_SUGGESTION:
      const animeInfo = action.payload.data.categories[0].items[0];
      state.map((value) => {
        if (value.id == animeInfo.id) {
          console.log("Anime in state");
          preventAdd = true;
        }
      })

      if (preventAdd) {
        return state;
      }
    
      console.log("Anime not in state");
      return [ animeInfo, ...state ];
    default:
      return state;
  }
}


//const parser = new x2js();
//console.log(parser.xml2js(action.payload.data).anime);

//console.log(action.payload.data.categories[0].type); HOW TO CHECK IF ANIME OR NOT
