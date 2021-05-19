/*eslint-disable*/

import React, { useEffect, useState, useContext, memo } from "react";
import { Nav } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { 재고context } from "./App.js";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";

function Detail(props) {
  console.log(props.shoes);
  const [경고창, 경고창변경] = useState(true);
  const 재고 = useContext(재고context);
  const [누른탭, 누른탭변경] = useState("상품정보");
  const [스위치, 스위치변경] = useState(false);
  const [사이즈, 사이즈변경] = useState("S");

  const { urlId } = useParams();
  const imgIndex = parseInt(urlId) + 1;
  const beforePageIndex = parseInt(urlId) - 1;
  const nextPageIndex = imgIndex;
  const history = useHistory();
  const 찾은상품 = props.shoes.find((obj) => obj.id == urlId);

  useEffect(() => {
    let 최근본상품들 = JSON.parse(localStorage.getItem("최근본상품"));
    최근본상품들 =
      최근본상품들 === null
        ? []
        : JSON.parse(localStorage.getItem("최근본상품"));

    const 상품obj = {
      id: urlId,
      title: props.shoes[urlId].title,
      content: props.shoes[urlId].content,
      price: props.shoes[urlId].price,
    };

    const 상품추가확인하기 = 최근본상품들.some((obj) => {
      return obj.id == urlId;
    });

    if (!상품추가확인하기) {
      최근본상품들.push(상품obj);
      localStorage.setItem("최근본상품", JSON.stringify(최근본상품들));
    }

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

  function 재고관리() {
    if (재고[0] <= 0) {
      return;
    }
    const newArr = [...재고];
    newArr[0] = newArr[0] - 1;
    props.재고변경(newArr);

    props.dispatch({
      type: "항목추가",
      데이터: 주문데이터반환(),
    });
    history.push("/cart");
  }

  function 주문데이터반환() {
    if (props.shoes)
      return {
        id: 찾은상품.id,
        상품명: 찾은상품.title,
        가격: 찾은상품.price,
        사이즈: 사이즈,
        수량: 1,
      };
  }

  return (
    <div className="상세페이지">
      <h2 className="상세페이지-title">상세 페이지</h2>

      {
        //
        경고창 === true ? <Alert /> : null
      }
      <main className="상세페이지-container">
        <div className="row ">
          <div className="col-md-6">
            <img
              src={
                "https://codingapple1.github.io/shop/shoes" + imgIndex + ".jpg"
              }
              width="100%"
            />
          </div>

          <div className="col-md-6 border 상세페이지-form">
            <div className="상세페이지-contents ">
              <h4 className="p-2">{찾은상품.title}</h4>
              <p>{찾은상품.content}</p>
              <p>{찾은상품.price}원</p>

              <Info 재고={재고} 찾은상품={찾은상품} />

              <div>
                <select
                  id="option1"
                  className="상세페이지-form__size"
                  defaultValue="사이즈선택"
                  onChange={(e) => {
                    사이즈변경(e.target.value);
                  }}
                >
                  <option value="사이즈선택" disabled hidden>
                    사이즈선택
                  </option>
                  <option value="S" className="small">
                    S
                  </option>
                  <option value="M" className="medium">
                    M
                  </option>
                  <option value="L" className="large">
                    L
                  </option>
                </select>
              </div>
            </div>
            <div className="상세페이지-form__buttons p-3">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  if (urlId <= 0) {
                    return;
                  }
                  history.push(`/detail/${beforePageIndex}`);
                }}
              >
                뒤로가기
              </button>
              <button className="btn btn-danger" onClick={재고관리}>
                주문하기
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  if (urlId >= 5) {
                    return;
                  }
                  history.push("/detail/" + nextPageIndex);
                }}
              >
                다음상품
              </button>
            </div>
          </div>
        </div>
      </main>
      <Nav variant="tabs" defaultActiveKey="link-0" className="상세페이지-tab">
        <Nav.Item>
          <Nav.Link
            eventKey="link-0"
            onClick={() => {
              스위치변경(false);
              누른탭변경("상품정보");
            }}
          >
            상품정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-1"
            onClick={() => {
              스위치변경(false);
              누른탭변경("배송정보");
            }}
          >
            배송정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link-2"
            onClick={() => {
              스위치변경(false);
              누른탭변경("환불약관");
            }}
          >
            환불약관
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <CSSTransition in={스위치} timeout={500} classNames="fade">
        <TabContents
          누른탭={누른탭}
          스위치변경={스위치변경}
          신발들={props.shoes}
        />
      </CSSTransition>
    </div>
  );
}

function TabContents(props) {
  useEffect(() => {
    props.스위치변경(true);
  });

  const 탭UI = {
    상품정보: "상품정보 탭입니다",
    배송정보: "배송정보 탭입니다",
    환불약관: "환불약관 탭입니다",
  };

  return <div>{탭UI[props.누른탭]}</div>;
}

function Info(props) {
  const 재고 = useContext(재고context);

  return (
    <div>
      <p> 재고 : {재고[props.찾은상품.id]}</p>
    </div>
  );
}

function Alert() {
  return <p className="alert__text">재고가 얼마 남지 않았습니다.</p>;
}

function props화시키기(state) {
  return {
    상품들: state.reducer,
    alert창: state.reducer2,
  };
}

export default connect(props화시키기)(Detail);
