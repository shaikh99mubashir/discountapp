import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
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
                        navigate("UploadVideo");
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert('error==>', errorCode)
                });
        });
    };


    return (
        <div>
            <input type='email' onChange={(e) => setEmail(e.target.value)} />
            <input type='password' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={loginBtnClicked}>Login</button>
        </div>
    )
}

export default Login