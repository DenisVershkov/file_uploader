import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import filesReducer from "./filesReducer";
import errorReducer from "./errorReducer";


const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  files: filesReducer,
  error: errorReducer,
})

export default rootReducer;
