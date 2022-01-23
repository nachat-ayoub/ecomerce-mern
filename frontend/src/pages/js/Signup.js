import React, { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import axios from "axios";

import "../css/Signup.css";

const Signup = ({ user }) => {
  const apiLink = "http://localhost:9000/api";
  // Sign up
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupAvatar, setSignupAvatar] = useState("");
  const [SignupEmail, setSignupEmail] = useState("");
  const [SignupPass, setSignupPass] = useState("");

  const updateUserProfile = (username, avatar) => {
    updateProfile(auth.currentUser, {
      displayName: username || "anonymous",
      photoURL:
        avatar ||
        "https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png",
    })
      .then((userProfile) => {
        // Profile updated!
        console.log(userProfile);
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  };

  const signup_handler = async () => {
    try {
      if ((SignupEmail && SignupPass && SignupUsername) !== "") {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          SignupEmail,
          SignupPass
        );
        if (user) {
          const token = await user.getIdToken();
          console.log("signup success");
          console.log(user);
          updateUserProfile(SignupUsername, SignupAvatar);

          window.location.href = "/";

          // savingUserInDB({
          //   email: SignupEmail,
          //   username: SignupUsername,
          //   uid: user.uid,
          // });
        } else {
          console.log("signup failed");
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

  return (
    <div className="Signup__container d-flex justify-content-center align-items-center">
      {user ? (
        <div className="container text-center mt-5 text-white">
          <h2>You are Logged in as : </h2> <br />
          <h1> {user.email}</h1>
        </div>
      ) : (
        <div className="container Signup__form">
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
          <label className="Signup__label" htmlFor="avatar">
            Avatar
          </label>
          <input
            className="Signup__input"
            type="text"
            placeholder="Avatar url"
            id="avatar"
            onChange={(e) => setSignupAvatar(e.target.value)}
            value={SignupAvatar}
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
      )}
    </div>
  );
};

export default Signup;
