import {useCart} from "../../context/cart-context";
import axios from "axios";
import {ReactComponent as WishlistSvg} from "../../asssets/wishlist.svg";
import {ReactComponent as WishlistedSvg} from "../../asssets/heart.svg";
import {deleteFromWishList} from "../index";
import {AddToCart, IncDecButton} from "../Button";
import {useEffect, useState} from "react";
export function WishListCard({product}) {
  const {
    dispatch,
    value: {cart, wishlist},
  } = useCart();
  const [itemQuantity, setItemQuantity] = useState(undefined);

  useEffect(() => {
    setItemQuantity(cart.find((prev) => prev?.productId?._id === product._id));
  }, [cart]);

  return (
    <div
      className="card card-shadow-1 mg-1 relative"
      style={{width: "12.5rem"}}
    >
      <img
        className="card-image"
        src={product.image}
        alt="product-list"
        style={{height: "8rem"}}
      ></img>
      {product.inStock === false && (
        <div class="card-text-overlay ">OUT OF STOCK</div>
      )}
      <button
        className="outline-none"
        style={{position: "absolute", top: "0.5rem", right: "0.5rem"}}
      >
        <button
          className="outline-none"
          onClick={() => deleteFromWishList({product, wishlist, dispatch})}
        >
          <WishlistedSvg />
        </button>
      </button>

      <div className="card-body text-left pd-quarter">
        <div className="flex row align-items-center">
          <div className="bold ">₹{product.price}</div>
          <div className="gray sm" style={{textDecoration: "line-through"}}>
            ₹125
          </div>
        </div>
        <div className="gray bold text-left" style={{height: "2rem"}}>
          {product.name}
        </div>
        <div
          className="gray sm pd-top-half pd-bottom-half"
          style={{height: "2rem"}}
        >
          Qty:1kg
          <div>{product.fastDelivery && <>Fast Delivery Available</>}</div>
        </div>
        {itemQuantity !== undefined ? (
          <IncDecButton product={product} />
        ) : (
          <AddToCart product={product} />
        )}
      </div>
    </div>
  );
}
