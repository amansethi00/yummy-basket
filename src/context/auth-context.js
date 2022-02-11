import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (
      localStorage?.getItem("username") !== undefined &&
      localStorage.getItem("password") !== undefined &&
      localStorage.getItem("isLogin") === "true"
    ) {
      setLogin(true);
    }
  }, []);
  const logoutHandler = async() => {
    await localStorage.removeItem("isLogin");
    await localStorage.removeItem("username");
    await localStorage.removeItem("password");
    setLogin(false);
  }
  return (
    <AuthContext.Provider value={{login, setLogin,logoutHandler}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
