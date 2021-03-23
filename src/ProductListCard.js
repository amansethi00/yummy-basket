import {useCart} from "./cart-context";
import {IncDecButton} from "./IncDecButton";
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
        <div className="gray bold text-left" style={{height: "2rem"}}>
          {product.name}
        </div>
        <div className="gray sm pd-top-half pd-bottom-1">Qty:1kg</div>
        {product.inCart ? (
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
