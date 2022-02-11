import { useState } from "react";
import {useCart} from "../../context/cart-context";
export function ProductListForm({sliderValue, setSliderValue}) {
  const {sortBy, fastDelivery, includeOutOfStock, dispatch} = useCart();
  const [show,setShow] = useState(false);
  if(!show){
    return (
      <button className='btn-secondary px-2' onClick={()=>setShow(true)} >Show filters</button>
    )
  }

  return (
    <form className='flex flex-col' >
      <label>
        <input
          type="radio"
          name="sort"
          defaultChecked={sortBy === "SORT_LOW_TO_HIGH" ? true : false}
          onChange={() => dispatch({type: "SORT_LOW_TO_HIGH"})}
        ></input>
        Sort Low To High
      </label>
      <label>
        <input
          type="radio"
          name="sort"
          defaultChecked={sortBy === "SORT_HIGH_TO_LOW" ? true : false}
          onChange={() => dispatch({type: "SORT_HIGH_TO_LOW"})}
        ></input>
        Sort High To Low
      </label>
      <br />
      Filter By
      <label>
        <input
          type="checkbox"
          checked={fastDelivery}
          onChange={() => dispatch({type: "TOGGLE_FAST_DELIVERY"})}
        ></input>
        Fast Delivery Only
      </label>
      <label>
        <input
          type="checkbox"
          onChange={() => dispatch({type: "TOGGLE_OUT_OF_STOCK"})}
          checked={includeOutOfStock}
        ></input>
        Include Out of stock
      </label>
      <br />
      <br />
      <div className="slidecontainer ">
        <input
          type="range"
          min="1"
          max="2000"
          className="slider"
          id="myRange"
          defaultValue="1200"
          onChange={(event) => setSliderValue(event.target.value)}
        />
        <p>
          Value: <span id="demo">{sliderValue}</span>
        </p>
      </div>
      <div>
      <input
        type="reset"
        onClick={() => {
          setSliderValue(1200);
          dispatch({type: "RESET"});
        }}
        className="outline-none btn-secondary-sm mg-top-half"
      />
      <button className='btn-secondary-sm outline-none px-2' onClick={()=>setShow(false)}  >Hide filters</button>
      </div>
      
    </form>
  );
}
