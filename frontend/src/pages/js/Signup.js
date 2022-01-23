import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "../css/Signup.css";
import { auth } from "../../firebaseConfig";
import axios from "axios";

const Signup = ({ authenticated, setauthenticated, setToken, apiLink }) => {
  // Sign up
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupEmail, setSignupEmail] = useState("");
  const [SignupPass, setSignupPass] = useState("");

  const signup_handler = async () => {
    try {
      if (SignupEmail && SignupPass && SignupUsername) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          SignupEmail,
          SignupPass
        );
        if (user) {
          setauthenticated(true);
          const token = await user.getIdToken();
          console.log("signup success");
          setToken(token);
          savingUserInDB({
            email: SignupEmail,
            username: SignupUsername,
            uid: user.uid,
          });
        } else {
          setauthenticated(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // After Sign Up Success => saving the user in the db
  const savingUserInDB = async ({ email, username, uid }) => {
    console.log("this is the data");
    console.log(email, username, uid);
    const response = await axios.post(`${apiLink}/signup/`, {
      email,
      username,
      uid,
    });
    console.log(response);
  };

  console.log(window.localStorage.getItem("auth"));
  console.log(authenticated);
  return (
    <div>
      {authenticated === "true" ? (
        <center>
          <h1>You are Loged in!</h1>
        </center>
      ) : (
        <div className="Signup__container container d-flex justify-content-center align-items-center">
          <div className="Signup__form">
            <h3 className="Signup__h3">Sign Up Here</h3>
            <label className="Signup__label" htmlFor="username">
              Username
            </label>
            <input
              className="Signup__input"
              type="text"
              placeholder="Username"
              id="username"
              onChange={(e) => setSignupUsername(e.target.value)}
              value={SignupUsername}
            />

            <label className="Signup__label" htmlFor="email">
              Email
            </label>
            <input
              className="Signup__input"
              type="email"
              placeholder="email@gmail.com"
              id="email"
              onChange={(e) => setSignupEmail(e.target.value)}
              value={SignupEmail}
            />

            <label className="Signup__label" htmlFor="password">
              Password
            </label>
            <input
              className="Signup__input"
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setSignupPass(e.target.value)}
              value={SignupPass}
            />

            <button onClick={signup_handler} className="Signup__btn">
              Sign Up
            </button>
            <div className="Signup__social">
              <div className="Signup__go">
                <i className="lab la-google-plus-g"></i> Google
              </div>
              <div className="Signup__fb">
                <i className="lab la-facebook-f"></i> Facebook
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
