import { combineReducers } from "redux";

import authReducer from "./authRedducer";
import postsReducer from "./postsReducer";

const rootReducer =  combineReducers({
    authReducer, postsReducer,
})

export default rootReducer;