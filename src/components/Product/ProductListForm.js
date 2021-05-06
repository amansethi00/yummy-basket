import {useCart} from "../../context/cart-context";
export function ProductListForm({sliderValue, setSliderValue}) {
  const {sortBy, fastDelivery, includeOutOfStock, dispatch} = useCart();

  return (
    <form>
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
      <input
        type="reset"
        onClick={() => {
          setSliderValue(1200);
          dispatch({type: "RESET"});
        }}
        className="outline-none btn-secondary-sm mg-top-half"
      />
    </form>
  );
}
