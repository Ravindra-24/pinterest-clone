
const userRouter = (state = {}, action) => {
    const { payload, type } = action;
  switch (type) {
    case "GET_USER":
      return { ...state, ...payload };
    case "GET_USER_POSTS":
      if(payload){
        const newarr = payload.filter((newPost) => !state.posts.some((existingPost) => existingPost._id === newPost._id))
        return {...state, posts: [...(state.posts || []), ...newarr]}
      }
      return state
    default:
      return state;
  }
}

export default userRouter;