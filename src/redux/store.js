import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { thunk } from "redux-thunk"; // Use named import
import authReducer from "./auth/reducer";
import listReducer from "./list/reducer";

function isProd() {
  if (import.meta.env.DEV) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
  return null;
}

const composeEnhancers = isProd() || compose;

export const rootReducer = combineReducers({
  auth: authReducer,
  list: listReducer,
});

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
