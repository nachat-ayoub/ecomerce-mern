import React, { useEffect, useState } from "react";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import Nav from "./components/js/Nav";
import Login from "./pages/js/Login";
import Signup from "./pages/js/Signup";
import Home from "./pages/js/Home";
import { auth } from "./firebaseConfig";

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Nav user={user} />
        <Routes>
          {/* pages */}

          <Route index element={<Home />} />
          <Route path="/login" element={<Login user={user} />} />
          <Route path="/signup" element={<Signup user={user} />} />

          {/* pages */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
