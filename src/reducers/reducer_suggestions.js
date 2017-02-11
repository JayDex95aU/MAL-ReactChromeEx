import { FETCH_SUGGESTION, TAB_SUGGESTION } from '../actions/index';
const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case FETCH_SUGGESTION:
      return [ action.payload, ...state ];
    case TAB_SUGGESTION:
      console.log(action);
      console.log("TAB SUGGESTION FIRED:");
      return state;
    default:
      return state;
  }
}
