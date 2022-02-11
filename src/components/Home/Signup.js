import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/auth-context";
import axios from "axios";
export const Signup = () => {
  const {login, setLogin} = useAuth();
  const [error, setError] = useState(null);
  let nameRef = useRef(null);
  let emailRef = useRef(null);

  let usernameRef = useRef(null);
  let passwordRef = useRef(null);

  let navigate = useNavigate();

  const signUpHandler = async () => {
    try {
      const response = await axios.post(
        "https://ecom.amansethi00.repl.co/signup",
        {
          email: emailRef.current.value,
          name: nameRef.current.value,
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
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
    } catch (error) {
      console.log(error);
      setError("error at server");
    }
  };
  return (
    <form onSubmit={e=>{
      e.preventDefault();
      signUpHandler();
    }} className="login flex justify-content-center col align-items-center">
      <h2>Signup</h2>
      <div className="form">
        {error && (
          <div className="toast-error">
            {error}
            <button className="outline-none" onClick={() => setError(null)}>
              X{" "}
            </button>
          </div>
        )}
        <div class="input-grp-lg">
          <span
            class="input-grp-text pd-right-2"
            style={{paddingRight: "3.0rem"}}
          >
            Name
          </span>
          <input
            class="input"
            placeholder="enter your name here"
            ref={nameRef}
          />
        </div>
        <div class="input-grp-lg">
          <span
            class="input-grp-text pd-right-2"
            style={{paddingRight: "3.2rem"}}
          >
            email
          </span>
          <input
            class="input"
            placeholder="enter your email here"
            ref={emailRef}
          />
        </div>
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
      <button className="button btn-secondary pd-1">
        Create Account
      </button>
      <Link to="/login">Login instead</Link>
      <div className="sm"></div>
    </form>
  );
};
