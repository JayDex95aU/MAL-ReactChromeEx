import { FETCH_SUGGESTION } from '../actions/index';
const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case FETCH_SUGGESTION:
      return [ action.payload, ...state ];
    default:
      return state;
  }
}
