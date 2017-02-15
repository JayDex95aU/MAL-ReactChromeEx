import { USER_ANIME } from '../actions/index';
import axios from 'axios';
import x2js from 'x2js';

export default function(state = {}, action) {
  switch(action.type[0]) {
    case USER_ANIME:
      var parser = new x2js();
      parser = parser.xml2js(action.payload.data).myanimelist;
      return parser;
    default:
      return state;
  };
}


//const parser = new x2js();
//console.log(parser.xml2js(action.payload.data).anime);
