import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
});

export const store = createStore(rootReducer, applyMiddleware(thunk));