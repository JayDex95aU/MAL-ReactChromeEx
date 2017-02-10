import axios from 'axios';

export const FETCH_SUGGESTION = 'FETCH_SUGGESTION';

export function fetchSuggestions(text) {
  return {
    type: 'ADD_TODO',
    text
  };
}
