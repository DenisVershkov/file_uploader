import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import initState from "./initialState";
import rootReducer from "./reducers/root"

const store = createStore(rootReducer, initState, composeWithDevTools(applyMiddleware(thunk)))

export default store
