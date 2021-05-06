import {useCart} from "../../context/cart-context";
import {IncDecButton} from "../Button/IncDecButtonCart";
import "./Cart.css";
export function CartList() {
  const {
    value: {cart},
    dispatch,
  } = useCart();
  console.log(cart);
  const filteredCart = cart.filter((item) => item.productId);
  console.log({filteredCart});
  return (
    <div className=" flex col justify-content-center align-items-center">
      <h2> My Cart</h2>
      <ul class="list-group">
        {filteredCart.map((item) => {
          return (
            <div className="cart-item  flex row justify-content-space-between align-items-center">
              <div className="pd-bottom-1 flex row">
                <img
                  src={item?.productId?.image}
                  className="card-image"
                  style={{width: "5rem", height: "100%"}}
                  alt="product-img"
                ></img>
                <div className="pd-left-half flex col  justify-content-space-between">
                  <div className="">{item?.productId?.name}</div>
                  <div className="row flex align-items-center ">
                    <div style={{width: "5rem"}}>
                      <IncDecButton
                        cart={cart}
                        product={item.productId}
                        dispatch={dispatch}
                      />
                    </div>
                    <span className="sm pd-left-1">
                      x ₹{item?.productId?.price}
                    </span>
                  </div>
                </div>
              </div>
              <span className="bold">
                ₹{item?.productId?.price * item.quantity}
              </span>
            </div>
          );
        })}
      </ul>
      <div className="bold">
        <span>
          {" "}
          TOTAL: ₹
          {filteredCart.reduce(
            (a, b) =>
              parseInt(a) +
              parseInt(b?.productId?.["price"]) * parseInt(b?.["quantity"]),
            0
          )}
        </span>
        <br />
        <button className="btn btn-primary-md">Checkout</button>
      </div>
    </div>
  );
}
