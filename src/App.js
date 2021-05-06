/*eslint-disable*/

import "./App.css";
import { Navbar, Nav, NavDropdown, Button, Jumbotron } from "react-bootstrap";
import React, { useState } from "react";
import Data from "./data.js";
import { Link, Route, Switch } from "react-router-dom";
import Detail from "./Detail.js";

function App() {
  let [shoes, shoes변경] = useState(Data);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ShoesShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/detail">Detail</Link>
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* main */}
      <Switch>
        <Route exact path="/">
          <Jumbotron className="background ">
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
                    title={신발.title}
                    price={신발.price}
                    content={신발.content}
                    i={index + 1}
                  />
                );
              })}
            </div>
          </div>
        </Route>

        {/* detail */}

        <Route path="/detail/:id">
          <Detail shoes={shoes} />
        </Route>

        {/* <Route path="/:id">
          <div>아무거나적었을때 이거 보여주세요 보여주세요</div>
        </Route> */}
      </Switch>
    </div>
  );
}

function 신발카드(props) {
  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="100%"
      />
      <h4>{props.title}</h4>
      <p>
        {props.content} & {props.price} 원
      </p>
    </div>
  );
}

export default App;
