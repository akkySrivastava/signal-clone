import React from "react";
import { auth, provider } from "../../firebase";
import "./Login.css";

function Login() {
  const signIn = (e) => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/150px-Signal-Logo.svg.png"
          alt=""
        />
      </div>
      <p>Hand Crafted With ❤️</p>
      <h3> by Code With Akky</h3>
      <div className="login__button">
        <button onClick={signIn}>Login</button>
      </div>
    </div>
  );
}

export default Login;
