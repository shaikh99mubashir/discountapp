import React, { useEffect, useState } from "react";
import { Container, Form, Col, Image, Row } from "react-bootstrap";
import app from "../../FirebaseConfig/Config";
import { BsEyeFill } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
const UpdatePassword = (props) => {
  const { updatePass } = props;

  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [passwordType2, setPasswordType2] = useState("password");
  const [passwordInput2, setPasswordInput2] = useState("");
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
    setNewPassword({ ...newPassword, oldPassword: evnt.target.value });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  const handlePasswordChange1 = (evnt) => {
    setPasswordInput1(evnt.target.value);
    setNewPassword({ ...newPassword, newPassword: evnt.target.value });
  };
  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text");
      return;
    }
    setPasswordType1("password");
  };

  const handlePasswordChange2 = (evnt) => {
    setPasswordInput2(evnt.target.value);
    setNewPassword({ ...newPassword, confirmNewPassword: evnt.target.value });
  };
  const togglePassword2 = () => {
    if (passwordType2 === "password") {
      setPasswordType2("text");
      return;
    }
    setPasswordType2("password");
  };
  // const user = firebase.auth().currentUser;
  const oldPassword = "currentPassword";

  const [user, setUser] = useState({});
  const [auth, setAuth] = useState("");

  let [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const auth = getAuth(app);
    const authCor = auth.currentUser;
    setCurrentUser(authCor);
  }, []);

  console.log(currentUser, "current");

  console.log(auth, "auth");

  const email = auth && auth.currentUser;

  // const credentials = auth.EmailAuthProvider.credential(email, oldPassword);
  console.log("user===>", user);
  console.log("email===>", email);
  // console.log('credentials===>', credentials);
  const [newPassword, setNewPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    handlePasswordChange,
  });
  return (
    <>
      {/* <div>UpdatePassword</div> */}
      <Container
        style={{
          marginTop: 20,
          border: "1px solid white",
          borderRadius: 5,
          padding: 30,
        }}
      >
        <Row className="align-items-center">
          <Col lg="6">
            <div style={{ color: "#222536" }}>Old Password</div>
            <div className="input-group" style={{ alignItems: "center" }}>
              <input
                type={passwordType}
                onChange={handlePasswordChange}
                value={passwordInput}
                name="password"
                className="form__input"
                placeholder="Password"
              />
              <div>
                <div onClick={togglePassword}>
                  {passwordType === "password" ? (
                    <BsEyeFill
                      style={{ marginLeft: "-30px", fontSize: "20px" }}
                    />
                  ) : (
                    <BsEyeFill
                      style={{
                        marginLeft: "-30px",
                        fontSize: "20px",
                        color: "rgb(212, 118, 23)",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <div className="input-group mb-3" controlId="formBasicEmail">
                    <input type={passwordType} onChange={handlePasswordChange} value={passwordInput} name="password" class="form-control" placeholder="Password"
                    // onChange={(e) => setNewPassword({ ...newPassword, oldPassword: e.target.value, })}
                    />
                    <div className="input-group-btn">
                        <button className="btn btn-outline-primary" onClick={togglePassword}>
                            {passwordType === "password" ?
                                <BsEyeFill /> : <BsEyeFill />}
                        </button>
                    </div>
                </div> */}
            <label for="" style={{ color: "#222536" }}>
              {" "}
              New Password
            </label>

            <div className="input-group" style={{ alignItems: "center" }}>
              <input
                type={passwordType1}
                onChange={handlePasswordChange1}
                value={passwordInput1}
                name="password"
                className="form__input"
                placeholder="Password"
              />
              <div>
                <div onClick={togglePassword1}>
                  {passwordType1 === "password" ? (
                    <BsEyeFill
                      style={{ marginLeft: "-30px", fontSize: "20px" }}
                    />
                  ) : (
                    <BsEyeFill
                      style={{
                        marginLeft: "-30px",
                        fontSize: "20px",
                        color: "rgb(212, 118, 23)",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <input
                className="form__input"
                type="email"
                placeholder="New Password"
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    newPassword: e.target.value,
                  })
                }
              />
            </Form.Group> */}

            <label for="" style={{ color: "#222536" }}>
              Confirm New Password
            </label>
            <div className="input-group" style={{ alignItems: "center" }}>
              <input
                type={passwordType2}
                onChange={handlePasswordChange2}
                value={passwordInput2}
                name="password"
                className="form__input"
                placeholder="Password"
              />
              <div>
                <div onClick={togglePassword2}>
                  {passwordType2 === "password" ? (
                    <BsEyeFill
                      style={{ marginLeft: "-30px", fontSize: "20px" }}
                    />
                  ) : (
                    <BsEyeFill
                      style={{
                        marginLeft: "-30px",
                        fontSize: "20px",
                        color: "rgb(212, 118, 23)",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <input
                className="form__input"
                type="email"
                placeholder="Confirm New Password"
                onChange={(e) =>
                  setNewPassword({
                    ...newPassword,
                    confirmNewPassword: e.target.value,
                  })
                }
              />
            </Form.Group> */}

            <button
              className="button-sub px-4 mt-3"
              type="submit"
              onClick={() => updatePass(newPassword)}
            >
              Submit
            </button>
          </Col>
          <Col lg="6">
            <Image
              style={{ objectFit: "cover", width: "100%" }}
              src={require("../../Images/login.png")}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdatePassword;
