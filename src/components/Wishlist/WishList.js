import {useCart} from "../../context/cart-context";
import {WishListCard} from "./WishListCard";
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
          return <WishListCard product={product} dispatch={dispatch} />;
        })}
      </div>
    </div>
  );
}
