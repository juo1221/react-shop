import React from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function Cart(props) {
  return (
    <main className="cart__container">
      <div className="cart__table">
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>상품명</th>
              <th>가격(원)</th>
              <th>수량(개)</th>
              <th>변경</th>
            </tr>
          </thead>
          <tbody>
            {props.상품들.map((상품, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{상품.상품명}</td>
                  <td>{상품.가격} </td>
                  <td>{상품.수량} </td>
                  <td>
                    <button
                      onClick={() => {
                        props.dispatch({ type: "수량증가" });
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        props.dispatch({ type: "수량감소" });
                      }}
                    >
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {props.alert창 === true ? (
          <div className="alert__text">
            <p>지금 구매하면 신규할인 20%</p>
            <button
              onClick={() => {
                props.dispatch({ type: "닫기" });
              }}
            >
              닫기
            </button>
          </div>
        ) : null}
      </div>
    </main>
  );
}
function props화시키기(state) {
  return {
    상품들: state.reducer,
    alert창: state.reducer2,
  };
}

export default connect(props화시키기)(Cart);

//export default Cart;
