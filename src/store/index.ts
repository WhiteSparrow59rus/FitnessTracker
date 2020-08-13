import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { walkReducer } from './walks/walkReducer'
import { AppActions } from "../types/actions";

export const rootReducer = combineReducers({
  walks: walkReducer
});

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer, 
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);