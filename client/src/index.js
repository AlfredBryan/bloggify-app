import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { configureStore } from "redux-starter-kit";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import rootReducer from "./reducers/rootReducer";

import * as serviceWorker from "./serviceWorker";

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore({ reducer: rootReducer });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
