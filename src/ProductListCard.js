import {useCart} from "./cart-context";
import "./ProductListCard.css";
export function ProductListCard({product}) {
  const {
    dispatch,
    value: {cart},
  } = useCart();
  return (
    <div className="card card-shadow-1 mg-1" style={{width: "12.5rem"}}>
      <img
        className="card-image"
        src={product.image}
        alt="product-list"
        style={{height: "8rem"}}
      ></img>
      <div className="card-body text-left pd-quarter">
        <div className="flex row align-items-center">
          <div className="bold ">₹{product.price}</div>
          <div className="gray sm" style={{textDecoration: "line-through"}}>
            ₹125
          </div>
        </div>

        <div className="gray text-left" style={{height: "2rem"}}>
          {product.name}
        </div>
        <div className="gray sm pd-top-half pd-bottom-1">Qty:1kg</div>
        {product.inCart ? (
          <div className="flex row align-items-center justify-content-space-between">
            <button
              className="btn-primary lg"
              onClick={() =>
                dispatch({type: "DECREMENT_QUANTITY", item: product})
              }
            >
              -
            </button>
            <div className="">
              {cart.filter((prev) => prev.id === product.id)[0].quantity}
            </div>
            <button
              className="btn-primary lg"
              onClick={() =>
                dispatch({type: "INCREMENT_QUANTITY", item: product})
              }
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="btn-primary-sm "
            style={{width: "100%"}}
            onClick={() =>
              dispatch({type: "ADD_TO_CART", item: {...product, quantity: 1}})
            }
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}
