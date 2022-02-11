import React, {useEffect} from "react";
import {Navigate, Route} from "react-router-dom";
import {useAuth} from "./context/auth-context";
import {Home} from "./components/Home/Home";
import {Login} from "./components/Home/Login";

export const PrivateRoute = ({path, element}) => {
  const {login} = useAuth();
  return (
    <>
      {login ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};
