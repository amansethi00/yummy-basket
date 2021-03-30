import {useState} from "react";
import {useCart} from "../context/cart-context";
import {ProductListCard} from "./ProductListCard";
export function ProductList() {
  const compareLowToHigh = (a, b) => {
    return a["price"] - b["price"];
  };
  const compareHighToLow = (a, b) => {
    return b["price"] - a["price"];
  };
  const getSorted = (prodList, sortBy) => {
    const newProdList = [];
    prodList.map((item) => newProdList.push(item));
    switch (sortBy) {
      case "SORT_LOW_TO_HIGH":
        return newProdList.sort(compareLowToHigh);
      case "SORT_HIGH_TO_LOW":
        return newProdList.sort(compareHighToLow);
      default:
        return prodList;
    }
  };
  const rangedData = (prodArray, sliderValue) => {
    //onsole.log( sliderValue);
    if (sliderValue !== null) {
      return prodArray.filter((item) => item.price <= parseInt(sliderValue));
    }
    return prodArray;
  };
  const filteredData = (prodArray, fastDelivery, includeOutOfStock) => {
    const fastDeliveryFilter =
      fastDelivery === true
        ? prodArray.filter(({fastDelivery}) => fastDelivery)
        : prodArray;
    console.log({fastDeliveryFilter});
    const includeOutOfStockFilter =
      includeOutOfStock === true
        ? fastDeliveryFilter
        : fastDeliveryFilter.filter(({inStock}) => inStock);
    console.log({includeOutOfStockFilter});
    return includeOutOfStockFilter;
  };
  const {
    value: {data, sortBy, fastDelivery, includeOutOfStock},
    dispatch,
  } = useCart();
  const sortedData = getSorted(data, sortBy);
  const filteredAndSortedData = filteredData(
    sortedData,
    fastDelivery,
    includeOutOfStock
  );
  const [sliderValue, setSliderValue] = useState(null);
  const viewData = rangedData(filteredAndSortedData, sliderValue);
  return (
    <div className="text-center">
      <h2>Product Listing</h2>
      <form>
        <label>
          <input
            type="radio"
            name="sort"
            checked={sortBy === "SORT_LOW_TO_HIGH" ? true : false}
            onChange={() => dispatch({type: "SORT_LOW_TO_HIGH"})}
          ></input>
          Sort Low To High
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            checked={sortBy === "SORT_HIGH_TO_LOW" ? true : false}
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
            max="1000"
            className="slider"
            id="myRange"
            defaultValue="500"
            onChange={(event) => setSliderValue(event.target.value)}
          />
          <p>
            Value: <span id="demo">{sliderValue}</span>
          </p>
        </div>
        <input
          type="reset"
          onClick={() => dispatch({type: "RESET"})}
          className="outline-none btn-secondary-sm mg-top-half"
        />
      </form>

      <div className="flex row card card-body justify-content-center mg-top-half">
        {viewData.map((product) => {
          return <ProductListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
