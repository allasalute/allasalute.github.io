// Actions
export const SET_SEARCH_QUERY = "app/SET_SEARCH_QUERY";
export const SET_REDIRECT = "app/SET_REDIRECT";

const initialState = {
  loginRedirect: "/",
  searchQuery: ""
};

// Reducer
export default function SetState(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SEARCH_QUERY:
    case SET_REDIRECT:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

// Action Creators
export const setSearchQuery = query => {
  return {
    type: SET_SEARCH_QUERY,
    payload: {
      searchQuery: query
    }
  };
};

export const setRedirect = payload => {
  return {
    type: SET_REDIRECT,
    payload: {
      loginRedirect: payload
    }
  };
};
