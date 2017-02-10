import axios from 'axios';

export const FETCH_SUGGESTION = 'FETCH_SUGGESTION';

export function fetchSuggestions(text) {
  return {
    type: FETCH_SUGGESTION,
    payload: text
  };
}
