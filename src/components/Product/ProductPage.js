import React from "react";
import {useLocation, useParams} from "react-router-dom";
import {useCart} from "../../context/cart-context";
import {IncDecButton} from "../Button/IncDecButton";
import {ReactComponent as WishlistSvg} from "../../asssets/wishlist.svg";
import {ReactComponent as WishlistedSvg} from "../../asssets/heart.svg";
import "./ProductPage.css";
export function ProductPage() {
  const {productId} = useParams();
  const {
    dispatch,
    value: {data, cart, wishlist},
    postDataToServer,
  } = useCart();

  const findProduct = (array, id) => {
    return array.filter((prev) => prev.id === productId)[0];
  };
  const product = findProduct(data, productId);
  console.log(productId);
  console.log(data);
  const wishlistItem = (product) => {
    return wishlist.filter((prev) => prev.productId === product.id)[0];
  };
  const deleteFromWishList = (product) => {
    postDataToServer({
      type: "DELETE_FROM_WISHLIST",
      item: wishlistItem(product),
    });
  };
  const addToWishList = (product) => {
    postDataToServer({
      type: "ADD_TO_WISHLIST",
      item: {...product, productId: product.id},
    });
  };
  return (
    <div className="modal">
      <div className="modal-container">
        <img src={product.image} alt="prod-img" className="modal-head" />
        <div className="modal-body bold">{product.name}</div>
        {product.inStock === false && (
          <div class="card-text-overlay ">OUT OF STOCK</div>
        )}
        <button
          className="outline-none"
          style={{position: "absolute", top: "0.5rem", right: "0.5rem"}}
        >
          {product.inWishlist === true ? (
            <button
              className="outline-none"
              onClick={() => deleteFromWishList(product)}
            >
              <WishlistedSvg />
            </button>
          ) : (
            <WishlistSvg
              style={{fill: "white"}}
              onClick={() => addToWishList(product)}
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
        </div>

        {cart.filter((prev) => prev.productId === product.id).length > 0 ? (
          <IncDecButton product={product} dispatch={dispatch} cart={cart} />
        ) : (
          <button
            className="btn-primary-sm "
            style={{width: "100%", alignSelf: "baseline"}}
            onClick={() =>
              postDataToServer({
                type: "ADD_TO_CART",
                item: {
                  ...product,
                  quantity: 1,
                  productId: product.id,
                  inCart: true,
                },
              })
            }
            disabled={product.inStock === false}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
}
