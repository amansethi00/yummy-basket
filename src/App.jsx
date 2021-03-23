import './App.css';
import {ProductList} from "./ProductList";
import {Cart} from "./Cart";
import { useTheme } from "./theme-context";
import {useCart} from "./cart-context";
import { useState } from 'react';
import {ReactComponent as DarkTheme} from "./asssets/dark-theme-white.svg";
import {ReactComponent as LightTheme} from "./asssets/dark-theme.svg";
import {ReactComponent as CartSvg} from "./asssets/cart.svg";
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
  const {value:{cart}}=useCart();
  const [route,setRoute]= useState("productList");
  return (
    <div style={{backgroundColor:selectedTheme[theme].bg,color:selectedTheme[theme].color,minHeight:"100vh"}}>
      <nav className="nav">
        <div className="nav-left">
          <div className="md">YummyBasket</div>
        </div>
        <div className="nav-right flex row align-center">
          <button className="btn-secondary white" onClick={()=>setRoute("productList")}> All Products</button>
          <button className="btn-secondary-sm white flex row align-center md hover-none" onClick={()=>setRoute("cart")}>
            <CartSvg/>
        {cart.reduce(((acc,curr)=>acc+curr.quantity),0)}
        </button>
        <button onClick={toggleTheme}>{theme==="light"?<DarkTheme/>:<LightTheme/>}</button>
        </div>
      </nav>
      {route==="productList"?<ProductList/>:<Cart/>
}
    </div>
  );
}

export default App;
