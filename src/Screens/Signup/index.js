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
import Form from 'react-bootstrap/Form';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const db = getDatabase(app);
    const navigate = useNavigate();

    const loginBtnClicked = () => {
   
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
                                        <h2 className="switch__title title" style={{ color: "#d47617" }}>Welcome Back !</h2>
                                        <p className="switch__description description" style={{ color: "#d47617" }}>When Money Talks, You Should Listen!</p>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <h2 class="form_title title" style={{ color: 'white' }}>Sign Up</h2>
                                <div class="form__icons"></div>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <input className="form__input" type='email' placeholder="email@email.com" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" placeholder="*****" controlId="formBasicPassword">
                                    <input className="form__input" type='password' onChange={(e) => setPassword(e.target.value)} />

                                </Form.Group>

                                <button className="form__button button" onClick={loginBtnClicked}>SIGN UP</button>
                                <Link to='/' style={{textDecoration:'none'}}>
                                <p style={{color:'white',marginTop:30}}>Already Have Account? SignIn</p>
                                </Link>
                            </Col>
                        </Row>

                    </div>

                </Container>
            </div>
           
        </Container>

    )
}

export default Signup