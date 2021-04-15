import './App.css';
import {ProductList} from "./components/Product/ProductList";
import {ProductPage}from "./components/Product/ProductPage";
import {WishList} from "./components/Wishlist/WishList";
import {CartList} from "./components/Cart/CartList";
import {Address} from "./components/Address/Address";
import { useTheme } from "./context/theme-context";
import {useCart} from "./context/cart-context";
import {useAxios} from "./useAxios";
import {ReactComponent as DarkTheme} from "./asssets/dark-theme-white.svg";
import {ReactComponent as LightTheme} from "./asssets/dark-theme.svg";
import {ReactComponent as CartSvg} from "./asssets/cart.svg";
import {ReactComponent as WishlistSvg} from "./asssets/wishlist.svg";
import {Routes,Route,Link} from "react-router-dom";
const selectedTheme={
  "light":{
    bg:"white",
    color:"black"
  },
  "dark":{
    bg:"black",
    color:"white"
  }
}
function App() {
  const {theme,toggleTheme} = useTheme();
  const {value:{cart,wishlist},showToast,setShowToast,textToast}=useCart();
  const {loading,error}=useAxios();
  console.log(textToast);
  if(showToast===true){
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  }
  return (
    <div style={{backgroundColor:selectedTheme[theme].bg,color:selectedTheme[theme].color,minHeight:"100vh"}}>
      <nav className="nav" style={{backgroundColor:selectedTheme[theme].bg,color:selectedTheme[theme].color}} >
        <div className="nav-left">
          <div className="md">YummyBasket</div>
        </div>
        <div className="nav-right flex row align-center">
          <Link to="/" style={{color:selectedTheme[theme].color,textDecoration:"none"}}> All Products</Link>
          <Link to="/cart" className="  flex row align-center sm " style={{color:selectedTheme[theme].color,textDecoration:"none"}}>
            <CartSvg style={{fill:selectedTheme[theme].color}}/>
        {cart.reduce(((acc,curr)=>acc+parseInt(curr.quantity)),0)}
        </Link>
        <Link to="/wishlist" className=" flex row align-center sm bg-transparent"  style={{color:selectedTheme[theme].color,textDecoration:"none"}}>
          <WishlistSvg style={{fill:selectedTheme[theme].color}}/>
          {wishlist.length}
        </Link>
        <button onClick={toggleTheme}>{theme==="light"?<DarkTheme/>:<LightTheme/>}</button>
        </div>
      </nav>

      <div className="text-center">
        {loading && <h3>Loading data from server...</h3>}
        {error!=="" && <h3>{error}</h3>}
      </div>
      {showToast && <div className="toast-info" style={{position:"fixed",left:"8px",bottom:"8px"}}>
        {textToast}
        <button class="outline-none">X </button>       
         </div>}
         <Routes>
           <Route path={"/"} element={<ProductList/>}/>
           <Route path={"/cart"} element={<CartList/>}/>
           <Route path={"/wishlist"} element={<WishList/>}/>
           <Route path={"/products/:productId"} element={<ProductPage/>}/>
           <Route path={"/checkout/address"} element={<Address/>}/>
         </Routes>
    </div>
  )
}

export default App;
