/*eslint-disable*/

import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

let 박스 = styled.div``;

function Detail(props) {
  let { id } = useParams();
  let imgIndex = parseInt(id) + 1;
  let history = useHistory();
  const 찾은상품 = props.shoes.find((obj) => obj.id == id);

  return (
    <div className="container">
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
          <button className="btn btn-danger">주문하기</button>
          <button
            className="btn btn-danger"
            onClick={() => {
              history.push("/");
            }}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;