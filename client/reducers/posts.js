// a reducer takes in two things:
// 1. the action (info about what happened)
// 2. compy of current state

function posts (state = { }, action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      console.log("Increment likes");
      console.log(state);
      const i = action.index;
      return [
        ...state.slice(0, 1), // before the one we are updating
        {...state[i], likes: state[i].likes + 1},
        ...state.slice(i + 1) // after the one we are updating
      ]
    default:
      return state;
  }
  return state;
}

export default posts;
