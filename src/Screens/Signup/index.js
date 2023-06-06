import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Image, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { BaseUrl } from "../../BaseUrl";

const Signup = () => {
  const initialData ={
    name:'',
    email:'',
    password:'',
  }
  const [signupData, setSignupData] = useState(initialData);
  console.log('signupData',signupData);
  const navigate = useNavigate()

  const signUpBtnClicked = () => {
    axios
      .post(`${BaseUrl}register`,signupData)
      .then((success) => {
        if(success.data.status){
          // alert(success.data.message)
          alert('signUp Sucessfully')
          navigate('/')
        }
        else{
          alert(success.data.message)
        }
        setSignupData(initialData)
      })
      .catch((error) => {
        console.log("error==>",error);
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
                      To Resturant!
                    </p>
                  </div>
                </div>
              </Col>
              <Col>
                <h2 class="form_title title" style={{ color: "white" }}>
                  Sign Up
                </h2>
                <div class="form__icons"></div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <input
                    className="form__input"
                    type="email"
                    placeholder="Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name:e.target.value})}
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                  <input
                    className="form__input"
                    type="number"
                    placeholder="Phone Number"
                    value={signupData.phone_number}
                    onChange={(e) => setSignupData({...signupData, phone_number:e.target.value})}
                  />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <input
                    className="form__input"
                    type="email"
                    value={signupData.email}
                    placeholder="email@email.com"
                    onChange={(e) => setSignupData({...signupData, email:e.target.value})}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicPassword"
                >
                  <input
                  placeholder="*****"
                    className="form__input"
                  value={signupData.password}
                    type="password"
                    onChange={(e) => setSignupData({...signupData, password:e.target.value})}
                  />
                </Form.Group>

                <button
                  className="form__button button"
                  onClick={signUpBtnClicked}
                >
                  SIGN UP
                </button>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <p style={{ color: "white", marginTop: 30 }}>
                    Already Have Account? SignIn
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

export default Signup;
