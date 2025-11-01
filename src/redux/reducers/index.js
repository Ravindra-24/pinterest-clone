import { combineReducers } from "redux";

import authReducer from "./authRedducer";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";
import ImageSliderReducer from "./ImageSliderReducer";
import searchReducer from "./searchReducer";

const rootReducer =  combineReducers({
    authReducer, postsReducer, userReducer, ImageSliderReducer, searchReducer,
})

export default rootReducer;