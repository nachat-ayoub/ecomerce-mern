import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//
//
//
//
//
//
//

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
// Sign up
const [SignupUsername, setSignupUsername] = useState("");
const [SignupEmail, setSignupEmail] = useState("");
const [SignupPass, setSignupPass] = useState("");

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
// saving the user in the db
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

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

{
  /* <h1 style={{ color: "red" }}>Api Response : {data} </h1>
      <h1>{theUser?.email ? `(${theUser?.email})` : "waiting..."}</h1>
      {!authenticated ? (
        <>
          <center>
            <h1>Sign up!</h1>
            <div className="inputs">
              <input
                type="text"
                name="username"
                onChange={(e) => setSignupUsername(e.target.value)}
                value={SignupUsername}
                placeholder="username"
              />
              <div>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setSignupEmail(e.target.value)}
                  value={SignupEmail}
                  placeholder="email"
                />
                <input
                  type="text"
                  name="password"
                  onChange={(e) => setSignupPass(e.target.value)}
                  value={SignupPass}  
                  placeholder="password"
                />
              </div>
            </div>
            <button onClick={signup_handler} className="btn">
              Sign up
            </button>
          </center>
          <center>
            <hr className="hr" />
          </center>
          <center>
            <h1>Login!</h1>
            <div className="inputs">
              <input
                type="text"
                name="email"
                onChange={(e) => setLoginEmail(e.target.value)}
                value={LoginEmail}
                placeholder="email"
              />
              <input
                type="text"
                name="password"
                onChange={(e) => setLoginPass(e.target.value)}
                value={LoginPass}
                placeholder="password"
              />
            </div>
            <button onClick={login_handler} className="btn">
              Login
            </button>
          </center>
        </>
      ) : (
        <button onClick={logout} className="btn">
          Logout
        </button>
      )} */
}
