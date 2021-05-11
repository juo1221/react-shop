/*eslint-disable*/

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

function Detail(props) {
  const [경고창, 경고창변경] = useState(true);
  const [입력값, 입력값변경] = useState("");

  useEffect(() => {
    const 타이머 = setTimeout(() => {
      경고창변경(false);
    }, 2000);
    return () => {
      clearTimeout(타이머);
      const newShoesArr = [...props.shoes];
      const filtered = newShoesArr.splice(0, 3);
      props.shoes변경(filtered);
      props.버튼숨김변경(false);
    };
  }, []);

  const { id } = useParams();
  const imgIndex = parseInt(id) + 1;
  const history = useHistory();
  const 찾은상품 = props.shoes.find((obj) => obj.id == id);

  function 재고관리() {
    if (props.재고[0] <= 0) {
      return;
    }
    const newArr = [...props.재고];
    newArr[0] = newArr[0] - 1;
    new props.재고변경(newArr);
  }

  return (
    <div className="container">
      <h2 className="container__title">Detail</h2>
      <input
        onChange={(e) => {
          입력값변경(e.target.value);
        }}
      />
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
          <Info 재고={props.재고} />

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
    </div>
  );
}

function Info(props) {
  return <div>재고 : {props.재고[0]}</div>;
}

function Alert() {
  return <p className="alert__text">재고가 얼마 남지 않았습니다.</p>;
}

export default Detail;
