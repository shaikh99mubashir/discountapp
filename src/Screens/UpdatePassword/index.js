import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import app from "../../FirebaseConfig/Config";
import { BsEyeFill } from 'react-icons/bs';
import { getDatabase, ref, onValue } from "firebase/database";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
const UpdatePassword = (props) => {
    const { updatePass } = props

    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const handlePasswordChange = (evnt) => {
        setPasswordInput(evnt.target.value);
        setNewPassword({ ...newPassword, oldPassword: evnt.target.value, })
    }
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    // const user = firebase.auth().currentUser;
    const oldPassword = "currentPassword";

    const [user, setUser] = useState({})
    const [auth, setAuth] = useState("")



    let [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const auth = getAuth(app);
        const authCor = auth.currentUser;
        setCurrentUser(authCor)
    }, [])


    console.log(currentUser, "current")


    console.log(auth, "auth")


    const email = auth && auth.currentUser

    // const credentials = auth.EmailAuthProvider.credential(email, oldPassword);
    console.log('user===>', user);
    console.log('email===>', email);
    // console.log('credentials===>', credentials);
    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        handlePasswordChange,
    })
    return (
        <>

            <div style={{ color: "white" }}>UpdatePassword</div>
            <div style={{ marginTop: 20, border: '1px solid white', borderRadius: 5, padding: 30 }}>
                <div style={{ color: '#222536' }}>Old Password</div>
                <div className="input-group" style={{ alignItems: 'center' }}>
                    <input type={passwordType} onChange={handlePasswordChange} value={passwordInput} name="password" className="form__input" placeholder="Password" />
                    <div className="input-group-btn">
                        <button className="btn btn-outline-primary" onClick={togglePassword}>
                            {passwordType === "password" ?
                                <BsEyeFill /> : <BsEyeFill />}
                        </button>
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
                <label for="" style={{ color: '#222536' }}> New Password</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input className="form__input" type='email' placeholder="New Password" onChange={(e) => setNewPassword({ ...newPassword, newPassword: e.target.value, })} />
                </Form.Group>

                <label for="" style={{ color: '#222536' }}>Confirm New Password</label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <input className="form__input" type='email' placeholder="Confirm New Password" onChange={(e) => setNewPassword({ ...newPassword, confirmNewPassword: e.target.value, })} />
                </Form.Group>

                <br />
                <button className="button-sub px-4" type="submit" onClick={() => updatePass(newPassword)} >Submit</button>
            </div>
        </>
    )
}

export default UpdatePassword