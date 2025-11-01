const initialState = {
  user: {},
  posts: [],
}
const userRouter = (state = initialState, action) => {
    const { payload, type } = action;
  switch (type) {
    case "GET_USER":
      return { ...state, user: payload };
    case "GET_USER_POSTS":
      if(payload){
        const newarr = payload.filter((newPost) => !state.posts.some((existingPost) => existingPost._id === newPost._id))
        return {...state, posts: [...(state.posts), ...newarr]}
      }
      return state
    default:
      return state;
  }
}

export default userRouter;