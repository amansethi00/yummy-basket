import { useCart } from "../../context/cart-context";
import axios from "axios";
import { toast } from "react-toastify";
export function IncDecButton({ product, setLoader,itemQuantity }) {
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
  const updateButton = async (product, quantity, isIncrement) => {
    const { _id } = product;
    setLoader(true);
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
      if (response.data.success) {
        if(isIncrement){
          toast.success("product quantity added in cart")
        }
        else{
          toast.info('product quantity decreased in cart')
        }
        dispatch({
          type: "SET_CART",
          payload: response.data.updatedCartInstancee,
        });
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex row align-items-center justify-content-space-between">
      <button
        className="font-bold text-lg m-1"
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
        {itemQuantity}
      </div>
      <button
        className="font-bold text-lg m-1"
        onClick={() =>
          updateButton(
            product,
            parseInt(
              cart.filter((prev) => prev?.productId?._id === product._id)[0]
                .quantity
            ) + 1,
            true
          )
        }
      >
        +
      </button>
    </div>
  );
}
