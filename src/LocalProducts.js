import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function LocalProducts(props) {
  let 불러온상품들 = JSON.parse(localStorage.getItem("최근본상품"));

  return (
    <main className="최근본상품-container">
      <h2 className="최근본상품-title">최근 본 상품</h2>
      <div className="container">
        <div className="row ">
          <RecentProducts 불러온상품들={불러온상품들} />
        </div>
      </div>
    </main>
  );
}

function RecentProducts(props) {
  let history = useHistory();

  if (props.불러온상품들 === null) {
    return (
      <div className="최근본상품-subtitle">
        <p>조회한 상품이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {props.불러온상품들.map((최근본상품, index) => {
        return (
          <div className="col-lg-4 col-md-6 mt-5 " key={index}>
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={
                  "https://codingapple1.github.io/shop/shoes" +
                  (+최근본상품.id + 1) +
                  ".jpg"
                }
              />
              <Card.Body>
                <Card.Title>{최근본상품.title}</Card.Title>
                <Card.Text>{최근본상품.content}</Card.Text>
                <Card.Text>{최근본상품.price}원</Card.Text>
                <Button
                  className="btn"
                  variant="danger"
                  onClick={() => {
                    history.push("/detail/" + 최근본상품.id);
                  }}
                >
                  구매하기
                </Button>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
}

export default LocalProducts;
