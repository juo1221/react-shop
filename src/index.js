/*eslint-disable*/

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

let alert초기값 = true;

function reducer2(state = alert초기값, 액션) {
  if (액션.type === "닫기") {
    return false;
  } else {
    return state;
  }
}

let 초기값 = [
  // { id: 1, 상품명: "에어포스1", 가격: "129,000", 수량: 7 },
  // { id: 2, 상품명: "오즈위고", 가격: "130,000", 수량: 10 },
  // { id: 3, 상품명: "반스", 가격: "70,000", 수량: 23 },
  // { id: 4, 상품명: "닥터마틴", 가격: "200,000", 수량: 2 },
];

function reducer(state = 초기값, 액션) {
  if (액션.type === "항목추가") {
    let copy = [...state];
    copy.push(액션.데이터);
    return copy;
  }
  if (액션.type === "수량증가") {
    let copy = [...state];
    copy[0].수량++;
    return copy;
  } else if (액션.type === "수량감소") {
    let copy = [...state];

    if (copy[0].수량 <= 0) {
      copy[0].수량 = 0;
      return copy;
    }

    copy[0].수량--;
    return copy;
  } else {
    return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
