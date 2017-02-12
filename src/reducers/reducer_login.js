import { TAB_SUGGESTION } from '../actions/index';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case FETCH_SUGGESTION:
      return [ action.payload, ...state ];
    case TAB_SUGGESTION:
      console.log("TAB SUGGESTION FIRED:");

      const parser = new x2js();
      console.log(parser.xml2js(action.payload.data).anime);

      return state;
    default:
      return state;
  }
}
