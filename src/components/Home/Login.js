import axios from "axios";
import _ from "lodash";
import React, { useRef, useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LockIcon } from "../../constant";
import { useAuth } from "../../context/auth-context";
import { useCart } from "../../context/cart-context";
import "./Login.css";
export const Login = () => {
  let usernameRef = useRef(null);
  let passwordRef = useRef(null);
  const { login, setLogin } = useAuth();
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    if(login === true){
      navigate('/products');
    }
    
  }, [login])
  const loginHandler = async () => {
    console.log(usernameRef,passwordRef)
    if( _.isUndefined(usernameRef.current.value) || _.isNull(usernameRef.current.value) || _.isUndefined(passwordRef.current.value) || _.isNull(passwordRef.current.value) || usernameRef.current.value === "" || passwordRef.current.value === ""){
      return; 
    }
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
        toast.success("logged in succesfuly")
        console.log(response)
        setLogin(true);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("username", `${usernameRef.current.value}`);
        localStorage.setItem("password", `${passwordRef.current.value}`);
        navigate("/products", { replace: true });
      } else {
        setError(response.data.message);
      }
      console.log(response);
    } catch (error) {
      // console.log(error.response.data.message);
      // setError(error.response.data.message);
      console.error(error)
    }
  };

  const guestLogin = () => {
    usernameRef.current.value = "guest";
    passwordRef.current.value = "guest";
    loginHandler();
  }
  return (
    <form onSubmit={(e)=>{
      e.preventDefault();
    loginHandler();
    }} className="login flex justify-content-center col align-items-center border-2">
      <h2 className='font-bold text-lg' >Login</h2>
      <div className="form flex flex-col justify-center items-center">
        {error && (
          <div className="toast-error">
            {error}
            <button className="outline-none" onClick={() => setError(null)}>
              X{" "}
            </button>
          </div>
        )}
        <br />
        <img src={LockIcon} className='w-16 mb-4' alt='lock-icon-login' />
        <div class="input-grp-lg">
          <span class="input-grp-text">username</span>
          <input
            class="input"
            placeholder="enter your username here"
            ref={usernameRef}
            required
          />
        </div>
        <div class="input-grp-lg">
          <span class="input-grp-text">password</span>
          <input
            class="input"
            placeholder="enter your password here"
            type="password"
            ref={passwordRef}
            required
          />
        </div>
      </div>
      <button
        className="button btn-secondary pd-half pd-right-2 pd-left-2"
      >
        Login
      </button>
      <Link to="/signup"><button className='mt-2 primary' >Sign Up instead</button></Link>
      OR
      <button className="button btn-secondary p-2" onClick={e=>{
        e.preventDefault();
        guestLogin()}} >Login as guest user</button>
      <br/>
    </form>
  );
};
