import {useState} from "react";
import {ProductListForm} from "./ProductListForm";
import {ProductData} from "./ProductData";

export function ProductList() {
  const [sliderValue, setSliderValue] = useState(500);

  return (
    <div className="text-center">
      <h2>Product Listing</h2>
      <ProductListForm
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      <ProductData sliderValue={sliderValue} />
    </div>
  );
}
