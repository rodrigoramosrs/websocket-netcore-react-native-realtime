// @flow
// import { AsyncStorage } from "react-native";
import devTools from "remote-redux-devtools";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore } from "redux-persist";
import reducer from "../reducers";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(onCompletion: () => void): any {
  const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    devTools({
      name: "nativestarterkit",
      realtime: true
    })
  );

  //sagaMiddleware.run({})

  const store = createStore(reducer, enhancer);
  persistStore(store, onCompletion);

  return store;
}
