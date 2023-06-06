import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const Login = () => {
  const navigate = useNavigate();
  const initialData = {
    email: "",
    password: "",
  };
  const [loginData, setLoginData] = useState(initialData);
  console.log("loginData==>", loginData);

  const loginBtnClicked = () => {
    axios
      .post(`${BaseUrl}login`, loginData)
      .then((success) => {
            alert('Login Sucessfully')
            navigate('Dashboard')
          
        setLoginData(initialData);
      })
      .catch((error) => {
        console.log("error==>", error);
      });
  };

  return (
    <Container fluid style={{ background: "#222536" }}>
      <div className="main" style={{ background: "#222536" }}>
        <Container className="b-container" style={{ background: "#222536" }}>
          <div>
            <Row>
              <Col>
                <div className="switch">
                  <div className="switch__container" id="switch-c1">
                    <h2
                      className="switch__title title"
                      style={{ color: "#d47617" }}
                    >
                      Welcome Back !
                    </h2>
                    <p
                      className="switch__description description"
                      style={{ color: "#d47617" }}
                    >
                     To your Resturant
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <h2 class="form_title title" style={{ color: "white" }}>
                  Sign In
                </h2>
                <div class="form__icons"></div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <input
                    className="form__input"
                    type="email"
                    value={loginData.email}
                    placeholder="email@email.com"
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <input
                    className="form__input"
                    type="password"
                    placeholder="*****"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                  />
                </Form.Group>

                <button
                  className="form__button button"
                  onClick={loginBtnClicked}
                >
                  SIGN IN
                </button>
                <Link to="/Signup" style={{ textDecoration: "none" }}>
                  <p style={{ color: "white", marginTop: 30 }}>
                    Don't Have Account? Signup
                  </p>
                </Link>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default Login;
