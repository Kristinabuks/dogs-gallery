import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { createStore, applyMiddleware, compose } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

function foobazReducer(state, action) {
  switch (action.type) {
    case "SET_DEFAULT_PHOTO":
      return {
        ...state,
        defaultPhoto: action.payload,
      };

    case "ADD_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };

    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };

    default:
      return state;
  }
}

let store = createStore(
  foobazReducer,
  {
    showSidebar: false,
    dogs: null,
    defaultPhoto: {
      breed: "",
      care: "",
      photo:
        "https://static.life.ru/publications/2022/5/2/948585187929.696-900x.jpeg",
      description:
        "Собака — домашнее животное, одно из наиболее популярных животных-компаньонов. Домашняя собака была описана как самостоятельный биологический вид Canis familiaris Линнеем в 1758 году; в настоящее время данное научное название признаётся многими авторитетными организациями",
    },
  },
  compose(applyMiddleware(thunkMiddleware), devToolsEnhancer())
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
