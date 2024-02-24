import { combineReducers } from "redux";

import authReducer from "./authRedducer";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";
import ImageSliderReducer from "./ImageSliderReducer";

const rootReducer =  combineReducers({
    authReducer, postsReducer, userReducer, ImageSliderReducer,
})

export default rootReducer;