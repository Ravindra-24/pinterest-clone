

// Initial state for the search
const initialState = {
  searchedPosts: [],
  loaded:false,
};

// Reducer function
const searchReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "FETCH_SEARCH_POSTS":
      return {
        ...state,
        searchedPosts: payload,
        loaded: true,
      };

    case "CLEAR_SEARCHED_POSTS":
      return {
        ...state,
        searchedPosts: [],
        loaded: false,
      };

    default:
      return state;
  }
};

export default searchReducer;
