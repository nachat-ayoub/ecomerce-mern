import React, { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import "../css/Login.css";

const Login = ({ user }) => {
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPass, setLoginPass] = useState("");

  const login_handler = async (e) => {
    try {
      e.preventDefault();
      if ((LoginEmail && LoginPass) !== "") {
        const { user } = await signInWithEmailAndPassword(
          auth,
          LoginEmail,
          LoginPass
        );
        console.log("login succeed!");
        console.log(user);
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Login__container  d-flex justify-content-center align-items-center">
      {user ? (
        <div className="container text-center mt-5 text-white">
          <h2>You are Logged in as : </h2> <br />
          <h1> {user.email}</h1>
        </div>
      ) : (
        <form className="container Login__form">
          <h3 className="Login__h3">Login Here</h3>
          <label className="Login__label" htmlFor="username">
            Email
          </label>
          <input
            className="Login__input"
            type="text"
            placeholder="email@gmail.com"
            id="username"
            onChange={(e) => setLoginEmail(e.target.value)}
            value={LoginEmail}
          />

          <label className="Login__label" htmlFor="password">
            Password
          </label>
          <input
            className="Login__input"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => setLoginPass(e.target.value)}
            value={LoginPass}
          />

          <button onClick={login_handler} className="Login__btn">
            Log In
          </button>
          <div className="Login__social">
            <div className="Login__go">
              <i className="lab la-google-plus-g"></i> Google
            </div>
            <div className="Login__fb">
              <i className="lab la-facebook-f"></i> Facebook
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
