import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createPromise } from "redux-promise-middleware";
import reduxConstants from "./reduxConstants";
import reducer from "./combineReducers";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import errorMiddleware from "./errorMiddleware";

const promiseMiddleware = createPromise({
  promiseTypeSuffixes: [reduxConstants.PENDING_SUFFIX, reduxConstants.SUCCESS_SUFFIX, reduxConstants.FAILURE_SUFFIX]
});

const middleware = [errorMiddleware, thunk, promiseMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore); // apply logger to redux

const FilterAuthTransform = createTransform(
  (inboundState, key) => {
    // Inbound gets called when auth gets updated and wants to persist.
    // This function filters out user information if the user hasn't selected remember me
    return { ...inboundState };
  },

  // transform state being rehydrated
  (outboundState, key) => {
    return outboundState;
  },

  // define which reducers this transform gets called for.
  { whitelist: ["auth"] }
);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  transforms: [FilterAuthTransform]
};

const configureStore = initialState => {
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = createStoreWithMiddleware(persistedReducer, initialState);
  return {
    store,
    persistor: persistStore(store)
  };
};
export default configureStore;
