import './App.css';
import {ProductList} from "./ProductList";
import {Cart} from "./Cart";
import { useTheme } from "./theme-context";
import {useCart} from "./cart-context";
import { useState } from 'react';
import {ReactComponent as DarkTheme} from "./asssets/dark-theme-white.svg";
import {ReactComponent as LightTheme} from "./asssets/dark-theme.svg";
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
          <button className="btn-secondary-sm white flex row align-center md" onClick={()=>setRoute("cart")}>
        <svg  xmlns="http://www.w3.org/2000/svg" width="24" fill="white" height="24" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>	
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
