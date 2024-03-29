import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {CartProvider} from "./context/cart-context";
import {ThemeProvider} from "./context/theme-context";
import {AuthProvider} from "./context/auth-context";
import {BrowserRouter as Router} from "react-router-dom";
// setupMockServer();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
