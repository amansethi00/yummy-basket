import './App.css';
import {ProductList} from "./components/ProductList";
import {WishList} from "./components/WishList";
import {Cart} from "./components/Cart";
import { useTheme } from "./context/theme-context";
import {useCart} from "./context/cart-context";
import { useState } from 'react';
import {useAxios} from "./useAxios";
import {ReactComponent as DarkTheme} from "./asssets/dark-theme-white.svg";
import {ReactComponent as LightTheme} from "./asssets/dark-theme.svg";
import {ReactComponent as CartSvg} from "./asssets/cart.svg";
import {ReactComponent as WishlistSvg} from "./asssets/wishlist.svg";
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
  const {value:{cart,wishlist}}=useCart();
  const [route,setRoute]= useState("productList");
  const {loading,error}=useAxios();
  return (
    <div style={{backgroundColor:selectedTheme[theme].bg,color:selectedTheme[theme].color,minHeight:"100vh"}}>
      <nav className="nav" style={{backgroundColor:selectedTheme[theme].bg,color:selectedTheme[theme].color}} >
        <div className="nav-left">
          <div className="md">YummyBasket</div>
        </div>
        <div className="nav-right flex row align-center">
          <button onClick={()=>setRoute("productList")} style={{color:selectedTheme[theme].color}}> All Products</button>
          <button className="  flex row align-center sm " onClick={()=>setRoute("cart")} style={{color:selectedTheme[theme].color}}>
            <CartSvg style={{fill:selectedTheme[theme].color}}/>
        {cart.reduce(((acc,curr)=>acc+curr.quantity),0)}
        </button>
        <button className=" flex row align-center sm bg-transparent" onClick={()=>setRoute("wishList")} style={{color:selectedTheme[theme].color}}>
          <WishlistSvg style={{fill:selectedTheme[theme].color}}/>
          {wishlist.length}
        </button>
        <button onClick={toggleTheme}>{theme==="light"?<DarkTheme/>:<LightTheme/>}</button>
        </div>
      </nav>
      {route==="productList"?<ProductList/>:route==="cart"?<Cart/>:<WishList/>
}
    <div className="text-center">
      {loading && <h3>Loading data from server...</h3>}
      {error!=="" && <h3>{error}</h3>}
    </div>
    </div>
  );
}

export default App;
