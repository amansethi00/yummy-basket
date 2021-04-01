import {useCart} from "../../context/cart-context";

export function IncDecButton({cart, product, dispatch}) {
  const {postDataToServer} = useCart();
  const getCartItem = (id) => {
    return cart.filter((prev) => prev.productId === id)[0];
  };
  const getCartItemQuantity = (product) => {
    return getCartItem(product.id).quantity;
  };
  console.log(cart);
  const decreaseButtonHandler = (product) => {
    if (product.quantity > 1) {
      postDataToServer({
        type: "DECREMENT_QUANTITY",
        item: {
          ...product,
          quantity: parseInt(product.quantity) - 1,
        },
      });
    } else {
      postDataToServer({
        type: "DELETE_FROM_CART",
        item: {
          ...product,
          quantity: parseInt(product.quantity) - 1,
        },
      });
    }
  };
  const increaseButtonHandler = () => {
    postDataToServer({
      type: "INCREMENT_QUANTITY",
      item: {
        ...product,
        quantity: parseInt(product.quantity) + 1,
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
        {
          cart.filter((prev) => prev.productId === product.productId)[0]
            .quantity
        }
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
