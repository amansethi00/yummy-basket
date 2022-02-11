import {useCart} from "../../context/cart-context";
import {ProductListCard} from "./ProductListCard";
import _ from 'lodash';
import { useEffect, useState } from "react";
export function ProductData({sliderValue, setLoader}) {
  const [viewState,setViewState] = useState([]);
  const {
    value: {data, sortBy, fastDelivery, includeOutOfStock},
  } = useCart();
  const compareLowToHigh = (a, b) => {
    return a["price"] - b["price"];
  };
  const compareHighToLow = (a, b) => {
    return b["price"] - a["price"];
  };
  const getSorted = (prodList, sortBy) => {
    const newProdList = _.cloneDeep(prodList);
    // prodList.map((item) => newProdList.push(item));
    switch (sortBy) {
      case "SORT_LOW_TO_HIGH":
        return newProdList.sort(compareLowToHigh);
      case "SORT_HIGH_TO_LOW":
        return newProdList.sort(compareHighToLow);
      default:
        return prodList;
    }
  };

  useEffect(()  => {
    const rangedData = (prodArray, sliderValue) => {
      return prodArray.filter(
        ({price}) => parseInt(price) < parseInt(sliderValue)
      );
    };
    const filteredData = (prodArray, fastDelivery, includeOutOfStock) => {
      const fastDeliveryFilter =
        fastDelivery === true
          ? prodArray.filter(({fastDelivery}) => fastDelivery)
          : prodArray;
      const includeOutOfStockFilter =
        includeOutOfStock === true
          ? fastDeliveryFilter
          : fastDeliveryFilter.filter(({inStock}) => inStock);
      return includeOutOfStockFilter;
    };
    const sortedData = getSorted(data, sortBy);
  const filteredAndSortedData = filteredData(
    sortedData,
    fastDelivery,
    includeOutOfStock
  );
  const viewData = rangedData(filteredAndSortedData, sliderValue);
  setViewState(viewData);

  },[data, sortBy, fastDelivery, includeOutOfStock,sliderValue])
  
  return (
    <div className="flex row card card-body justify-content-center mg-top-half">
      {viewState.map((product) => {
        return <ProductListCard setLoader={setLoader} product={product} />;
      })}
    </div>
  );
}
