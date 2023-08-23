
const userRouter = (state = {}, action) => {
    const { payload, type } = action;
  switch (type) {
    case "GET_USER":
      return { ...state, ...payload };
    case "GET_USER_POSTS":
      return { ...state, posts: payload };
    default:
      return state;
  }
}

export default userRouter;