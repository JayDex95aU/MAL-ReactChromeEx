import { LOGIN_REQUEST } from '../actions/index';
import x2js from 'x2js';

const INITAL_STATE = [];

export default function(state = INITAL_STATE, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      console.log(action.payload);
      return [ action.payload, ...state ];
    default:
      return state;
  }
}
