import {useCart} from "./cart-context";
import {ProductListCard} from "./ProductListCard";
export function ProductList() {
  const {
    value: {data},
    dispatch,
  } = useCart();
  return (
    <div className="text-center">
      <h2>Product Listing</h2>
      <div className="flex row card card-body justify-content-center">
        {data.map((product) => {
          return <ProductListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
