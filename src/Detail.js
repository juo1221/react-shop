/*eslint-disable*/

import React, { useEffect, useState, useContext } from "react";
import { Nav } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { 재고context } from "./App.js";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

function Detail(props) {
  const [경고창, 경고창변경] = useState(true);
  const [입력값, 입력값변경] = useState("");
  const 재고 = useContext(재고context);
  const [누른탭, 누른탭변경] = useState(0);
  const [스위치, 스위치변경] = useState(false);

  useEffect(() => {
    const 타이머 = setTimeout(() => {
      경고창변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
      props.버튼숨김변경(false);

      const newShoesArr = [...props.shoes];
      const filtered = newShoesArr.splice(0, 3);
      props.shoes변경(filtered);
    };
  }, []);

  const { id } = useParams();
  const imgIndex = parseInt(id) + 1;
  const history = useHistory();
  const 찾은상품 = props.shoes.find((obj) => obj.id == id);

  function 재고관리() {
    if (재고[0] <= 0) {
      return;
    }
    const newArr = [...재고];
    newArr[0] = newArr[0] - 1;
    props.재고변경(newArr);

    props.dispatch({
      type: "항목추가",
      데이터: { 상품명: "새로운상품", 가격: "새로운가격", 수량: 1 },
    });
    history.push("/cart");
  }

  return (
    <div className="container">
      <h2 className="container__title">Detail</h2>

      {
        //
        경고창 === true ? <Alert /> : null
      }

      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" + imgIndex + ".jpg"
            }
            width="100%"
          />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <Info 재고={재고} />

          <button
            className="btn btn-danger"
            onClick={() => {
              history.goBack();
            }}
          >
            뒤로가기
          </button>
          <button className="btn btn-danger" onClick={재고관리}>
            주문하기
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              props.상세페이지번호변경(props.상세페이지번호 + 1);
              history.push(`/detail/${props.상세페이지번호}`);
            }}
          >
            다음상품
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경(0);
            }}
          >
            Tab 0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경(1);
            }}
          >
            Tab 1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              스위치변경(false);
              누른탭변경(2);
            }}
          >
            Tab 2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} timeout={500} classNames="fade">
        <TabContents 누른탭={누른탭} 스위치변경={스위치변경} />
      </CSSTransition>
    </div>
  );
}

function TabContents(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  if (props.누른탭 === 0) {
    return <div>0번째 탭입니다.</div>;
  } else if (props.누른탭 === 1) {
    return <div>1번째 탭입니다.</div>;
  } else {
    return <div>2번째 탭입니다.</div>;
  }
}

function Info(props) {
  const 재고 = useContext(재고context);

  return <div>재고 : {재고[0]}</div>;
}

function Alert() {
  return <p className="alert__text">재고가 얼마 남지 않았습니다.</p>;
}

function props화시키기(state) {
  console.log(state);
  return {
    상품들: state.reducer,
    alert창: state.reducer2,
  };
}

export default connect(props화시키기)(Detail);
