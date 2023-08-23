import { combineReducers } from "redux";

import authReducer from "./authRedducer";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";

const rootReducer =  combineReducers({
    authReducer, postsReducer, userReducer,
})

export default rootReducer;