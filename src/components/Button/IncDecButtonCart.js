import {useCart} from "../../context/cart-context";
import axios from "axios";
export function IncDecButton({product, dispatch}) {
  const {
    value: {cart},
  } = useCart();
  const getCartItem = (id) => {
    return cart.filter((prev) => prev.productId === id)[0];
  };
  // const getCartItemQuantity = (product) => {
  //   return getCartItem(product.id).quantity;
  // };
  // console.log(cart);
  // const decreaseButtonHandler = (product) => {
  //   if (product.quantity > 1) {
  //     postDataToServer({
  //       type: "DECREMENT_QUANTITY",
  //       item: {
  //         ...product,
  //         quantity: parseInt(product.quantity) - 1,
  //       },
  //     });
  //   } else {
  //     postDataToServer({
  //       type: "DELETE_FROM_CART",
  //       item: {
  //         ...product,
  //         quantity: parseInt(product.quantity) - 1,
  //       },
  //     });
  //   }
  // };
  // const increaseButtonHandler = () => {
  //   postDataToServer({
  //     type: "INCREMENT_QUANTITY",
  //     item: {
  //       ...product,
  //       quantity: parseInt(product.quantity) + 1,
  //     },
  //   });
  // };
  const updateButton = async (product, quantity) => {
    const {_id} = product;
    console.log(_id);
    try {
      const response = await axios.post(
        "https://ecom.amansethi00.repl.co/cart",
        {
          productId: _id,
          quantity,
          id: cart.filter((prev) => prev?.productId?._id === product._id)[0]
            ._id,
        },
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
  console.log(
    "cart value",
    cart.filter((prev) => prev?.productId?._id === product._id)[0]?.quantity
  );
  return (
    <div className="flex row align-items-center justify-content-space-between">
      <button
        className="btn-primary lg"
        onClick={() =>
          updateButton(
            product,
            parseInt(
              cart.filter((prev) => prev?.productId?._id === product._id)[0]
                .quantity
            ) - 1
          )
        }
      >
        -
      </button>
      <div className="">
        {
          cart.filter((prev) => prev?.productId?._id === product._id)[0]
            ?.quantity
        }
      </div>
      <button
        className="btn-primary lg"
        onClick={() =>
          updateButton(
            product,
            cart.filter((prev) => prev.productId?._id === product._id)[0]
              .quantity + 1
          )
        }
      >
        +
      </button>
    </div>
  );
}
