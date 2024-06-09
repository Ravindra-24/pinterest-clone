const initialState = {
  token: null,
  user: null,
  loaded: false,
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case "AUTH":
      return { ...state, ...payload, loaded: true };
    case "LOGOUT":
      localStorage.clear();
      return { initialState, loaded: true };
    default:
      return state;
  }
};

export default authReducer;
