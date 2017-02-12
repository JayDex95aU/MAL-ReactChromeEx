import { TAB_SUGGESTION } from '../actions/index';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case TAB_SUGGESTION:
      console.log(action.payload.data.categories[0].items);
      return [ action.payload, ...state ];
    default:
      return state;
  }
}


//const parser = new x2js();
//console.log(parser.xml2js(action.payload.data).anime);

//console.log(action.payload.data.categories[0].type); HOW TO CHECK IF ANIME OR NOT
