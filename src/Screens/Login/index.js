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
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);

    console.log(email, password)

    const db = getDatabase(app);
    const navigate = useNavigate();

    const loginBtnClicked = () => {
        new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const { uid } = user
                    console.log(uid)
                    console.log(user)
                    const obj = [email, password];
                    if (user.email == 'admin@blackdollor.com') {
                        console.log('sing in successfully');
                        localStorage.setItem('UserData', JSON.stringify(user))
                        let data = {
                            email: email,
                            password: password,

                        }

                        data && navigate("Dashboard", { state: data });
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('error==>', errorCode, errorMessage)
                });
        });
    };

    const [user, setUser] = useState('')
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                var uid = user.uid;

                setUser(uid)
            } else {
                navigate("/");
            }
        });
    }, []);
    console.log('user', user);

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
                                <h2 class="form_title title" style={{ color: 'white' }}>Sign In</h2>
                                <div class="form__icons"></div>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <input className="form__input" type='email' placeholder="email@email.com" onChange={(e) => setEmail(e.target.value)} />
                                </Form.Group>

                                <Form.Group className="mb-3" placeholder="*****" controlId="formBasicPassword">
                                    <input className="form__input" type='password' onChange={(e) => setPassword(e.target.value)} />

                                </Form.Group>

                                <button className="form__button button" onClick={loginBtnClicked}>SIGN IN</button>

                            </Col>
                        </Row>

                    </div>

                </Container>
            </div>
            {/* <div>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <input type='password' onChange={(e) => setPassword(e.target.value)} />
                <button onClick={loginBtnClicked}>Login</button>
            </div> */}
        </Container>

    )
}

export default Login