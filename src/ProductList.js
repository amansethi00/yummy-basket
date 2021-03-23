import {useCart} from "./cart-context";
import {ProductListCard} from "./ProductListCard";
export function ProductList() {
  const compareLowToHigh = (a, b) => {
    return a["price"] - b["price"];
  };
  const compareHighToLow = (a, b) => {
    return b["price"] - a["price"];
  };
  const getSorted = (data, sortBy) => {
    console.log("get sorted");
    switch (sortBy) {
      case "SORT_LOW_TO_HIGH":
        return data.sort(compareLowToHigh);
      case "SORT_HIGH_TO_LOW":
        return data.sort(compareHighToLow);
      default:
        return [...data];
    }
  };
  const {
    value: {data, sortBy},
    dispatch,
  } = useCart();
  const sortedData = getSorted(data, sortBy);
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
      <div className="flex row card card-body justify-content-center">
        {sortedData.map((product) => {
          return <ProductListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
