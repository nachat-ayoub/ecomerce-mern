import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Nav from "./components/js/Nav";
import Login from "./pages/js/Login";
import Signup from "./pages/js/Signup";
import Home from "./pages/js/Home";

function App() {
  const [authenticated, setauthenticated] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  // Api base link
  const apiLink = "http://localhost:9000";
  // Api Data
  const [data, setData] = useState("");
  // user object
  const [theUser, setTheUser] = useState({});
  // user Token
  const [token, setToken] = useState("");

  // Login
  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPass, setLoginPass] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setTheUser(currentUser);
        setauthenticated(true);
        window.localStorage.setItem("auth", "true");
        const token = await currentUser.getIdToken();
        setToken(token);
        if (token) {
          Check_current_user(token);
        }
      }
    });
  }, [authenticated]);

  const Check_current_user = async (token) => {
    const { data } = await axios.get(`${apiLink}/api/`, {
      headers: {
        Authorisation: "Bearer " + token,
      },
    });
    setData(data.data);
    console.log(data);
  };

  const login_handler = async () => {
    try {
      if (LoginEmail && LoginPass) {
        const { user } = await signInWithEmailAndPassword(
          auth,
          LoginEmail,
          LoginPass
        );
        if (user) {
          setauthenticated(true);
          const token = await user.getIdToken();
          setTheUser(auth.currentUser);
          //
          console.log("Login success");
          setToken(token);
        } else {
          setauthenticated(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setauthenticated(false);
    window.localStorage.setItem("auth", "false");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        <Routes>
          {/* pages */}

          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/signup"
            element={
              <Signup
                authenticated={authenticated}
                setauthenticated={setauthenticated}
                setToken={setToken}
                apiLink={apiLink}
              />
            }
          />

          {/* pages */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
