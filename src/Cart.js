import {useCart} from "./cart-context";
export function Cart() {
  const {
    value: {cart},
  } = useCart();
  return (
    <div className="card flex col justify-content-center align-items-center">
      <h2> My Cart</h2>
      <ul class="list-group">
        {cart.map((item) => {
          return (
            <div class="card card-body flex row" style={{width: "15rem"}}>
              <img
                src={item.image}
                className="card-image"
                style={{width: "3.5rem", height: "100%"}}
                alt="product-img"
              ></img>
              <div className="pd-left-half">
                {item.name}
                <div>
                  <button class="btn-primary ">-</button>
                  {item.quantity}
                  <button class="btn-primary">+</button>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}