import {useCart} from "./cart-context";
import {IncDecButton} from "./IncDecButton";
export function Cart() {
  const {
    value: {cart},
    dispatch,
  } = useCart();
  return (
    <div className="card flex col justify-content-center align-items-center">
      <h2> My Cart</h2>
      <ul class="list-group">
        {cart.map((item) => {
          return (
            <div class=" card-body flex row ">
              <img
                src={item.image}
                className="card-image"
                style={{width: "5rem", height: "100%"}}
                alt="product-img"
              ></img>
              <div className="pd-left-half flex col bold justify-content-space-between">
                {item.name}
                <IncDecButton cart={cart} product={item} dispatch={dispatch} />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
