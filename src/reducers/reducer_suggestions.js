// import action creator type here

export default function(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return [ action.text, ...state ];
    default:
      return state;
  }
}
