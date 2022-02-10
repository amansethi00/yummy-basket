import './App.css';
import { ProductList } from "./components/Product/ProductList";
import { ProductPage } from "./components/Product/ProductPage";
import { WishList } from "./components/Wishlist/WishList";
import { CartList } from "./components/Cart/CartList";
import { Address } from "./components/Address/Address";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Home/Login";
import { Signup } from "./components/Home/Signup";
import { useTheme } from "./context/theme-context";
import { useCart } from "./context/cart-context";
import { useAxios } from "./useAxios";
import { ReactComponent as DarkTheme } from "./asssets/dark-theme-white.svg";
import { ReactComponent as LightTheme } from "./asssets/dark-theme.svg";
import { ReactComponent as CartSvg } from "./asssets/cart.svg";
import { ReactComponent as WishlistSvg } from "./asssets/wishlist.svg";
import { Routes, Route, Link } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { useEffect, useState } from 'react';
import { ReactComponent as TruckLogo } from './asssets/truck.svg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/auth-context';

const selectedTheme = {
  "light": {
    bg: "white",
    color: "black"
  },
  "dark": {
    bg: "black",
    color: "white"
  }
}
function App() {
  const { theme, toggleTheme } = useTheme();
  const { value: { cart, wishlist }, showToast, setShowToast, textToast, dispatch } = useCart();
  const { login, logoutHandler } = useAuth();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.reduce(((acc, curr) => acc + parseInt(curr.quantity)), 0));
  }, [cart])
  console.log({ cartItemsCount });
  const { loading, error } = "";
  console.log(textToast);
  if (showToast === true) {
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  }

  return (
    <div style={{ backgroundColor: selectedTheme[theme].bg, color: selectedTheme[theme].color, minHeight: "100vh" }}>
      <nav className="flex flex-row justify-between p-3" style={{ backgroundColor: selectedTheme[theme].bg, color: selectedTheme[theme].color }} >
        <div className="nav-left">
          <Link to='/' className='no-underline' style={{ color: selectedTheme[theme].color, textDecoration: "none" }} >
            <div className="md" style={{ color: selectedTheme[theme].color, textDecoration: "none" }}>🚚Mini Basket</div>
          </Link>
        </div>
        <div className="nav-right flex row align-center">
          {"  "}
          <Link to="/products" style={{ color: selectedTheme[theme].color, textDecoration: "none" }}  > All Products</Link>
          <Link to="/cart" className="  flex row align-center sm " style={{ color: selectedTheme[theme].color, textDecoration: "none" }}>
            <CartSvg style={{ fill: selectedTheme[theme].color }} />
            {cartItemsCount}
          </Link>
          <Link to="/wishlist" className=" flex row align-center sm bg-transparent" style={{ color: selectedTheme[theme].color, textDecoration: "none" }}>
            <WishlistSvg style={{ fill: selectedTheme[theme].color }} />
            {wishlist.length}
          </Link>
          {!login ? <Link to="/login" style={{ color: selectedTheme[theme].color, textDecoration: "none", paddingLeft: "1rem" }}> Login</Link> :
            <button className='mx-2' onClick={() => {
              dispatch({ type: "LOGOUT" });
              logoutHandler();
            }
            }  >Logout</button>
          }


          {/* <button onClick={toggleTheme}>{theme === "light" ? <DarkTheme /> : <LightTheme />}</button> */}
        </div>
      </nav>

      <div className="text-center">
        {loading && <h3>Loading data from server...</h3>}
        {error !== "" && <h3>{error}</h3>}
      </div>
      {showToast && <div className="toast-info" style={{ position: "fixed", left: "8px", bottom: "8px" }}>
        {textToast}
        <button class="outline-none">X </button>
      </div>}
      <Routes>
        <Route path={"/"} element={<Home />} />
        <PrivateRoute path={"/products"} element={<ProductList />} />
        <PrivateRoute path={"/cart"} element={<CartList />} />
        <PrivateRoute path={"/wishlist"} element={<WishList />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/products/:productId"} element={<ProductPage />} />
        <PrivateRoute path={"/checkout/address"} element={<Address />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className='mt-4'
      />
      {/* Same as */}
    </div>
  )
}

export default App;
