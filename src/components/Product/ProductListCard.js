import {useCart} from "../../context/cart-context";
import {IncDecButton} from "../Button/IncDecButton";
import {ReactComponent as WishlistSvg} from "../../asssets/wishlist.svg";
import {ReactComponent as WishlistedSvg} from "../../asssets/heart.svg";
import {ProductPage} from "./ProductPage";
import {Link} from "react-router-dom";
import "./ProductListCard.css";
import axios from "axios";
import {useEffect, useState} from "react";
export function ProductListCard({product}) {
  const {
    dispatch,
    value: {cart, wishlist},
  } = useCart();
  console.log("cart from pLc", cart);
  const wishlistItem = (product) => {
    return wishlist.filter((prev) => prev.productId === product.id)[0];
  };
  const deleteFromWishList = async (product, wishlistInstanceId) => {
    try {
      const response = await axios.delete(
        "https://ecom.amansethi00.repl.co/wishlist",
        {productId: product._id, id: wishlistInstanceId},
        {
          headers: {
            Authorization: `${localStorage.getItem(
              "username"
            )}:${localStorage.getItem("password")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "SET_WISHLIST",
          payload: response.data.updatedWishlist,
        });
      }
    } catch (error) {}
  };
  const addToWishList = async (product) => {
    try {
      const response = await axios.post(
        "https://ecom.amansethi00.repl.co/wishlist",
        {productId: product._id},
        {
          headers: {
            Authorization: `${localStorage.getItem(
              "username"
            )}:${localStorage.getItem("password")}`,
          },
        }
      );
      if (response.data.success) {
        dispatch({
          type: "SET_WISHLIST",
          payload: response.data.updatedWishlist,
        });
      }
    } catch (error) {}
  };
  const addToCart = async (product) => {
    const {_id} = product;
    console.log(_id);
    try {
      const response = await axios.post(
        "https://ecom.amansethi00.repl.co/cart",
        {productId: _id, quantity: 1},
        {
          headers: {
            Authorization: `${localStorage.getItem(
              "username"
            )}:${localStorage.getItem("password")}`,
          },
        }
      );
      console.log(response);
      if (response.data.success) {
        console.log("Success");
        dispatch({
          type: "SET_CART",
          payload: response.data.updatedCartInstancee,
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setItemQuantity(cart.find((prev) => prev.productId === product._id));
  }, [cart]);
  const [itemQuantity, setItemQuantity] = useState(undefined);
  console.log(
    "item qunatiyt",
    itemQuantity,
    cart.find((prev) => prev.productId === product._id),
    cart
  );

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
            {wishlist.filter((prev) => prev == product._id).length > 0 ? (
              <button
                className="outline-none"
                onClick={() =>
                  deleteFromWishList(
                    product,
                    wishlist.filter((prev) => prev == product._id)[0]._id
                  )
                }
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
        <button
          className="btn-primary-sm "
          style={{width: "100%", alignSelf: "baseline"}}
          onClick={() => addToCart(product)}
          disabled={product.inStock === false}
        >
          ADD TO CART
        </button>
      )}
    </div>
  );
}
