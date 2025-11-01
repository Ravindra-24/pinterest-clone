const initialsSate = {
  posts: [],
  loaded: false
};
const postsReducer = (state = initialsSate, action) => {
  const { payload, type } = action;
  switch (type) {
    case "FETCH_ALL_POSTS":
      if (payload) {
        const newPosts = payload.filter(
          (newPost) =>
            !state.posts.some(
              (existingPost) => existingPost._id === newPost._id
            )
        );
        return {
          ...state,
          posts: [...(state.posts || []), ...newPosts],
          loaded: true
        };
      }
      return state;
    case "GET_POST_DETAILS":
      if (payload) {
        return {
          ...state,
          post: payload,
          loaded: true
        };
      }
      return state;
    case "UPDATE_POST":
      if (payload) {
        console.log(payload);
        const updatedPosts = state.posts.map((post) =>
          post._id === payload._id ? payload : post
        );

        return {
          ...state,
          posts: updatedPosts,

        };
      }
      return state;
    case "DELETE_POST":
      if (payload) {
        const filteredPosts = state.posts.filter(
          (post) => post._id !== payload
        );
        return {
          ...state,
          posts: filteredPosts,
        };
      }
      return state;
    
    default:
      return state;
  }
};

export default postsReducer;
