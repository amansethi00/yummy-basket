import {useCart} from "../../context/cart-context";
import {IncDecButton} from "../Button/IncDecButton";
import {ReactComponent as WishlistSvg} from "../../asssets/wishlist.svg";
import {ReactComponent as WishlistedSvg} from "../../asssets/heart.svg";
import {ProductPage} from "./ProductPage";
import {Link} from "react-router-dom";
import "./ProductListCard.css";
import axios from "axios";
import {useEffect, useState} from "react";
import {addToWishList, deleteFromWishList} from "../index";
import {AddToCart} from "../Button";
export function ProductListCard({product}) {
  const {
    dispatch,
    value: {cart, wishlist},
  } = useCart();
  const [inWishlist, setInWishlist] = useState(false);
  const [itemQuantity, setItemQuantity] = useState(undefined);

  useEffect(() => {
    console.log(
      "in wishlist",
      wishlist.find((prev) => prev?.productId._id === product?._id)
        ? true
        : false
    );
    setInWishlist(
      wishlist.find((prev) => prev?.productId._id === product?._id)
        ? true
        : false
    );
  }, [wishlist]);
  useEffect(() => {
    setItemQuantity(cart.find((prev) => prev?.productId?._id === product._id));
  }, [cart]);

  return (
    <div
      className="card card-shadow-1 mg-1 relative"
      style={{width: "12.5rem", height: "17rem"}}
    >
      <div>
        <div>
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
            {inWishlist ? (
              <button
                className="outline-none"
                onClick={() =>
                  deleteFromWishList({product, dispatch, wishlist})
                }
              >
                <WishlistedSvg />
              </button>
            ) : (
              <WishlistSvg
                style={{fill: "white"}}
                onClick={() => addToWishList({product, dispatch})}
              />
            )}
          </button>

          <div
            href={`/products/${product.id}`}
            className="card-body text-left pd-quarter"
          >
            <div className="flex row align-items-center">
              <div className="bold ">₹{product.price}</div>
              <div className="gray sm" style={{textDecoration: "line-through"}}>
                {product.mrp}
              </div>
            </div>
            <div className="gray bold text-left" style={{height: "2rem"}}>
              {product.name}
            </div>
            <div
              className="gray sm pd-top-half pd-bottom-half"
              style={{height: "2rem"}}
            >
              <div>{product.fastDelivery && <>Fast Delivery Available</>}</div>
            </div>
          </div>
        </div>
      </div>

      {itemQuantity !== undefined ? (
        <IncDecButton product={product} />
      ) : (
        <AddToCart product={product} />
      )}
    </div>
  );
}
