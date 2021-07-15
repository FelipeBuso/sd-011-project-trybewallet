const initialState = {
  user: {
    email: '',
  },
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, email: action.payload, loggedIn: action.payload.logged };
  default:
    return state;
  }
}

export default user;
