import {useCart} from "../context/cart-context";
import {ProductListCard} from "./ProductListCard";
export function ProductList() {
  const compareLowToHigh = (a, b) => {
    return a["price"] - b["price"];
  };
  const compareHighToLow = (a, b) => {
    return b["price"] - a["price"];
  };
  const getSorted = (data, sortBy) => {
    switch (sortBy) {
      case "SORT_LOW_TO_HIGH":
        return data.sort(compareLowToHigh);
      case "SORT_HIGH_TO_LOW":
        return data.sort(compareHighToLow);
      default:
        return [...data];
    }
  };
  const filteredData = (data, fastDelivery, includeOutOfStock) => {
    const fastDeliveryFilter =
      fastDelivery === true
        ? data.filter(({fastDelivery}) => fastDelivery)
        : data;
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
  const viewData = filteredData(sortedData, fastDelivery, includeOutOfStock);
  console.log(data);
  return (
    <div className="text-center">
      <h2>Product Listing</h2>
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
      <div className="flex row card card-body justify-content-center">
        {viewData.map((product) => {
          return <ProductListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
