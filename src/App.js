/*eslint-disable*/

import "./App.css";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import React, {
  useState,
  useContext,
  lazy,
  Suspense,
  useEffect,
  useRef,
} from "react";
import Data from "./data.js";
import { Link, Route, Switch, useHistory, useLocation } from "react-router-dom";
import "./Detail.scss";
import axios from "axios";
import Cart from "./Cart.js";
import LocalProducts from "./LocalProducts.js";

let Detail = lazy(() => {
  return import("./Detail.js");
});
export let 재고context = React.createContext();

function App() {
  const [shoes, shoes변경] = useState(Data);
  const [요청결과, 요청결과변경] = useState(true);
  const [버튼숨김, 버튼숨김변경] = useState(false);
  const [로딩, 로딩변경] = useState(false);
  const [재고, 재고변경] = useState([10, 17, 2, 5, 9, 1]);
  const location = useLocation({ pathname: "/App" });

  function 데이터자르기() {
    const newShoesArr = [...shoes];
    const filtered = newShoesArr.splice(0, 3);
    shoes변경(filtered);
  }

  function 데이터불러오기() {
    axios
      .get("https://codingapple1.github.io/shop/data2.json")
      .then((result) => {
        shoes변경([...shoes, ...result.data]);
      });
  }
  useEffect(() => {
    if (location.pathname === "/") {
      if (버튼숨김 === true) {
        버튼숨김변경(false);
      }
      데이터자르기();
    } else if (location.pathname === "/최근본상품") {
      데이터불러오기();
    }
  }, [location]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <Link to="/" className="Navbar__logo">
            ShoesShop
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            <Nav.Link as={Link} to="/">
              홈
            </Nav.Link>
            <Nav.Link as={Link} to="/detail/0">
              상세 페이지
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              장바구니
            </Nav.Link>
            <Nav.Link as={Link} to="/최근본상품">
              최근 본 상품
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>{" "}
      {/* main */}
      <Switch>
        <Route exact path="/">
          <Jumbotron className="main__background ">
            <h1>20% Season OFF</h1>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Jumbotron>
          <div className="container">
            <div className="row">
              {shoes.map((신발, index) => {
                return (
                  <신발카드
                    key={index}
                    id={신발.id}
                    title={신발.title}
                    content={신발.content}
                    i={index}
                  />
                );
              })}
            </div>
          </div>
          {로딩 === true ? <로딩창 /> : null}

          {버튼숨김 === false ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                로딩변경(true);

                axios
                  .get("https://codingapple1.github.io/shop/data2.json")
                  .then((result) => {
                    setTimeout(() => {
                      shoes변경([...shoes, ...result.data]);
                      요청결과변경(true);
                      버튼숨김변경(true);
                      로딩변경(false);
                    }, 500);
                  })
                  .catch(() => {
                    로딩변경(false);
                    요청결과변경(false);
                  });
              }}
            >
              더보기
            </button>
          ) : null}

          {
            //
            요청결과 === false ? <요청실패창 /> : null
          }
        </Route>

        {/* detail */}

        <Route path="/detail/:urlId">
          <재고context.Provider value={재고}>
            <Suspense fallback={<div>로딩중입니다.</div>}>
              <Detail
                데이터자르기={데이터자르기}
                데이터불러오기={데이터불러오기}
                shoes={shoes}
                버튼숨김변경={버튼숨김변경}
                재고변경={재고변경}
              />
            </Suspense>
          </재고context.Provider>
        </Route>

        <Route path="/cart">
          <Cart 버튼숨김변경={버튼숨김변경} />
        </Route>
        <Route path="/최근본상품">
          <LocalProducts
            shoes={shoes}
            버튼숨김={버튼숨김}
            버튼숨김변경={버튼숨김변경}
          />
        </Route>
      </Switch>
    </div>
  );
}

function 신발카드(props) {
  let history = useHistory();

  return (
    <div
      className="col-lg-4"
      onClick={() => {
        history.push("/detail/" + props.id);
      }}
    >
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="100%"
      />
      <h4>{props.title}</h4>
      <p>{props.content}</p>
    </div>
  );
}

function 로딩창() {
  return (
    <div>
      <i className="fas fa-spinner icon__loading"></i>
    </div>
  );
}

function 요청실패창() {
  return (
    <div className="axios-container">
      <div className="axios__alert">데이터 요청에 실패했습니다.</div>
    </div>
  );
}

export default App;
