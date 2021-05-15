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
              <th>사이즈</th>
              <th>수량(개)</th>
              <th>변경</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {props.상품들.map((상품, index) => {
              return (
                <tr key={index}>
                  <td>{상품.id}</td>
                  <td>{상품.상품명}</td>
                  <td>{상품.가격} </td>
                  <td>{상품.사이즈} </td>
                  <td>{상품.수량} </td>

                  <td>
                    <button
                      className="btn "
                      onClick={() => {
                        props.dispatch({
                          type: "수량증가",
                          데이터: { id: 상품.id, 사이즈: 상품.사이즈 },
                        });
                      }}
                    >
                      +
                    </button>
                    <button
                      className="btn "
                      onClick={() => {
                        props.dispatch({
                          type: "수량감소",
                          데이터: { id: 상품.id, 사이즈: 상품.사이즈 },
                        });
                      }}
                    >
                      -
                    </button>
                  </td>
                  <td>
                    <i
                      className="fas fa-trash-alt"
                      onClick={() =>
                        props.dispatch({
                          type: "삭제",
                          데이터: { id: 상품.id },
                        })
                      }
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <button
          className="btn btn__sort"
          onClick={() => {
            props.dispatch({
              type: "정렬",
              데이터: props.상품들,
            });
          }}
        >
          정렬
        </button>
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
