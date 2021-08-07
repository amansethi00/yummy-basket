import { useCart } from "../../context/cart-context";
import axios from "axios";
import { toast } from "react-toastify";
export function IncDecButton({ product }) {
  const {
    value: { cart },
    dispatch,
  } = useCart();
  const getCartItem = (id) => {
    return cart.filter((prev) => prev.productId._id === id)[0];
  };
  const getCartItemQuantity = (product) => {
    return getCartItem(product.id).quantity;
  };
  const updateButton = async (product, quantity) => {
    console.log({ "quantity from update buttton": quantity });
    const { _id } = product;
    console.log(_id);
    try {
      const response = await axios.post(
        "https://ecom.amansethi00.repl.co/cart",
        {
          productId: _id,
          quantity,
          id: cart.find((prev) => prev?.productId?._id === product._id)._id,
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
        toast.success("product quantity updated in cart")
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
  console.log(cart);

  return (
    <div className="flex row align-items-center justify-content-space-between">
      <button
        className="btn-primary lg"
        onClick={() =>
          updateButton(
            product,
            parseInt(
              cart.find((prev) => prev?.productId?._id === product._id).quantity
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
            parseInt(
              cart.filter((prev) => prev?.productId?._id === product._id)[0]
                .quantity
            ) + 1
          )
        }
      >
        +
      </button>
    </div>
  );
}
