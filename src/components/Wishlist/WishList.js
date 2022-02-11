import { useState } from "react";
import {useCart} from "../../context/cart-context";
import LoaderIcon from "../Loader";
import {WishListCard} from "./WishListCard";
export function WishList() {
  const {
    value: {wishlist},
    dispatch,
  } = useCart();
  const [loader,setLoader] = useState(false);
  console.log({wishlist})
  return (
    <div className="text-center">
      <h2>WishList</h2>
      <div className="flex row card card-body justify-content-center">
        {wishlist.map((product) => {
          return (
            <WishListCard product={product.productId} setLoader={setLoader} dispatch={dispatch} />
          );
        })}
      </div>
      {loader && <LoaderIcon/>}
    </div>
  );
}
