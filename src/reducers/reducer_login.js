import { LOGIN_DETAILS, DELETE_LOGIN_DETAILS } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type[0]) {
    case LOGIN_DETAILS:
      const new_state = {username: action.username, password: action.password};
      console.log(new_state);
      return new_state;
    case DELETE_LOGIN_DETAILS:
      const new_state_clear = {};
      return new_state_clear;
  };
  return state;
}
