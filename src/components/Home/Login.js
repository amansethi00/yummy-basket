import axios from "axios";
import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth-context";
import {useCart} from "../../context/cart-context";
import "./Login.css";
export const Login = () => {
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  const {login, setLogin} = useAuth();
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  const loginHandler = async () => {
    try {
      const response = await axios.get(
        "https://ecom.amansethi00.repl.co/login",
        {
          headers: {
            authorization: `${usernameRef.current.value}:${passwordRef.current.value}`,
          },
        }
      );
      if (response.data.success) {
        setLogin(true);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("username", `${usernameRef.current.value}`);
        localStorage.setItem("password", `${passwordRef.current.value}`);
        navigate("/products", {replace: true});
      } else {
        setError(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login flex justify-content-center col align-items-center">
      <h2>Login</h2>
      <div className="form">
        {error && (
          <div className="toast-error">
            {error}
            <button className="outline-none" onClick={() => setError(null)}>
              X{" "}
            </button>
          </div>
        )}
        <br />
        <div class="input-grp-lg">
          <span class="input-grp-text">username</span>
          <input
            class="input"
            placeholder="enter your username here"
            ref={usernameRef}
          />
        </div>
        <div class="input-grp-lg">
          <span class="input-grp-text">password</span>
          <input
            class="input"
            placeholder="enter your password here"
            type="password"
            ref={passwordRef}
          />
        </div>
      </div>
      <button
        onClick={loginHandler}
        className="button btn-secondary pd-half pd-right-2 pd-left-2"
      >
        Login
      </button>
      <Link to="/signup">Sign Up instead</Link>
    </div>
  );
};
