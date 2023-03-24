import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Slidebar from "../Slidebar";
import UpdatePassword from "../UpdatePassword";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updatePassword,
} from "firebase/auth";
import app from "../../FirebaseConfig/Config";
import App from "../../App";

const Setting = () => {
  const location = useLocation;

  let [currentUser, setCurrentUser] = useState({});

  const auth = getAuth(app);
  useEffect(() => {
    const authCor = auth.currentUser;
    setCurrentUser(authCor);
  }, []);

  const { state } = location;

  const updatedPassword = (passwords) => {
    let { oldPassword, newPassword, confirmNewPassword } = passwords;
    if (!oldPassword) {
      alert("enter old password");
      return;
    }
    if (!newPassword) {
      alert("enter new password");
      return;
    }
    if (!confirmNewPassword) {
      alert("enter Confirm password");
      return;
    }
    if (confirmNewPassword !== newPassword) {
      alert("Password not match");
      return;
    }

    signInWithEmailAndPassword(auth, currentUser.email, oldPassword)
      .then((res) => {
        let { user } = res;
        updatePassword(user, newPassword)
          .then((res) => {
            alert("passwords Update successfully");
          })
          .catch((error) => {
            alert("Passwrod not updated");
          });
      })
      .catch((error) => {
        if (error) {
          alert("Wrong old password");
        }
      });
  };

  return (
    <>
      <Slidebar
        title="Settings"
        style={{ color: "#d47617", fontSize: 30, fontWeight: "bold" }}
      />
      <UpdatePassword updatePass={updatedPassword} />
    </>
  );
};

export default Setting;
