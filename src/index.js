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

function 항목추가(state, 액션) {
  const copy = [...state];
  const 찾은항목 = copy.find((obj) => {
    return obj.id === 액션.데이터.id && obj.사이즈 === 액션.데이터.사이즈;
  });

  if (찾은항목 === undefined) {
    copy.push(액션.데이터);
  } else {
    // 찾은항목.주문수량++;
  }
  return copy;
}
function 수량증가(state, 액션) {
  const 남은재고 = 액션.데이터.남은재고.find(
    (재고, index) => 액션.데이터.id === index
  );

  const copy = [...state];

  const 찾은항목 = copy.find((obj) => {
    return obj.id === 액션.데이터.id && obj.사이즈 === 액션.데이터.사이즈;
  });

  if (찾은항목.주문수량 >= 남은재고) {
    return copy;
  }
  찾은항목.주문수량++;
  return copy;
}

function 수량감소(state, 액션) {
  let copy = [...state];
  const 찾은항목 = copy.find((obj) => {
    return obj.id === 액션.데이터.id && obj.사이즈 === 액션.데이터.사이즈;
  });

  if (찾은항목.주문수량 <= 0) {
    찾은항목.주문수량 = 0;
    return copy;
  }
  찾은항목.주문수량--;
  return copy;
}

function 삭제(state, 액션) {
  let copy = [...state];
  const 찾은인덱스 = copy.findIndex((obj) => obj.id === 액션.데이터.id);
  copy.splice(찾은인덱스, 1);
  return copy;
}

// let arr = ["l", "s", "m"];
// arr.sort((next, prev) => (next > prev ? -1 : 0));
//

function 정렬(state) {
  let copy = [...state];
  copy.sort((next, prev) => {
    if (prev.id > next.id) {
      return -1;
    } else if (prev.id === next.id && next.사이즈 > prev.사이즈) {
      return -1;
    } else {
      return 0;
    }
  });

  return copy;
}

let 초기값 = [];

function reducer(state = 초기값, 액션) {
  switch (액션.type) {
    case "항목추가":
      return 항목추가(state, 액션);

    case "수량증가":
      return 수량증가(state, 액션);

    case "수량감소":
      return 수량감소(state, 액션);

    case "삭제":
      return 삭제(state, 액션);

    case "정렬":
      return 정렬(state);

    default:
      return state;
  }
}

let store = createStore(combineReducers({ reducer, reducer2 }));

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
