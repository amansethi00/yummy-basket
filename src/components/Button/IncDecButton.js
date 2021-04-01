import {useCart} from "../../context/cart-context";

export function IncDecButton({cart, product, dispatch}) {
  const {postDataToServer} = useCart();
  const getCartItem = (id) => {
    return cart.filter((prev) => prev.id === id)[0];
  };
  const getCartItemQuantity = (product) => {
    return getCartItem(product.id).quantity;
  };
  console.log(cart);
  const decreaseButtonHandler = (product) => {
    if (getCartItemQuantity(product) > 1) {
      postDataToServer({
        type: "DECREMENT_QUANTITY",
        item: {
          id: product.id,
          ...getCartItem(product.id),
          quantity: parseInt(getCartItem(product.id).quantity) - 1,
        },
      });
    } else {
      postDataToServer({
        type: "DELETE_FROM_CART",
        item: {
          id: product.id,
          ...getCartItem(product.id),
          quantity: parseInt(getCartItem(product.id).quantity) - 1,
        },
      });
    }
  };
  const increaseButtonHandler = () => {
    postDataToServer({
      type: "INCREMENT_QUANTITY",
      item: {
        id: product.id,
        ...getCartItem(product.id),
        quantity: parseInt(getCartItem(product.id).quantity) + 1,
      },
    });
  };
  return (
    <div className="flex row align-items-center justify-content-space-between">
      <button
        className="btn-primary lg"
        onClick={() => decreaseButtonHandler(product)}
      >
        -
      </button>
      <div className="">
        {cart.filter((prev) => prev.id === product.id)[0].quantity}
      </div>
      <button
        className="btn-primary lg"
        onClick={() => increaseButtonHandler(product)}
      >
        +
      </button>
    </div>
  );
}
