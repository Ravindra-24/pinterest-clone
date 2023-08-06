import { combineReducers } from "redux";

import authReducer from "./authRedducer";

const rootReducer =  combineReducers({
    authReducer,
})

export default rootReducer;