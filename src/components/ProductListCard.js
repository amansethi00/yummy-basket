import {useCart} from "../context/cart-context";
import {IncDecButton} from "./IncDecButton";
import {ReactComponent as WishlistSvg} from "../asssets/wishlist.svg";
import {ReactComponent as WishlistedSvg} from "../asssets/heart.svg";
export function ProductListCard({product}) {
  const {
    dispatch,
    value: {cart},
  } = useCart();
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
        {product.inWishlist === true ? (
          <WishlistedSvg
            onClick={() =>
              dispatch({type: "REMOVE_FROM_WISHLIST", item: product})
            }
          />
        ) : (
          <WishlistSvg
            onClick={() =>
              dispatch({
                type: "ADD_TO_WISHLIST",
                item: {...product, inWishlist: true},
              })
            }
          />
        )}
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
        <div className="gray sm pd-top-half pd-bottom-1">
          Qty:1kg
          <br />
          {product.fastDelivery && <>Fast Delivery Available</>}
        </div>
        {cart.filter((prev) => prev.id === product.id).length > 0 ? (
          <IncDecButton product={product} dispatch={dispatch} cart={cart} />
        ) : (
          <button
            className="btn-primary-sm "
            style={{width: "100%"}}
            onClick={() =>
              dispatch({type: "ADD_TO_CART", item: {...product, quantity: 1}})
            }
          >
            ADD
          </button>
        )}
      </div>
    </div>
  );
}
