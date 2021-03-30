import {useCart} from "../../context/cart-context";
import {ProductListCard} from "../Product/ProductListCard";
export function WishList() {
  const {
    value: {wishlist},
    dispatch,
  } = useCart();
  return (
    <div className="text-center">
      <h2>WishList</h2>
      <div className="flex row card card-body justify-content-center">
        {wishlist.map((product) => {
          return <ProductListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
