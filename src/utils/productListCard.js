import axios from "axios";
import { toast } from "react-toastify";

export const deleteFromWishList = async ({ product, dispatch, wishlist }) => {
  console.log("in eishlist");
  console.log("productId", product._id);
  try {
    const response = await axios.delete(
      `https://ecom.amansethi00.repl.co/wishlist/${product._id}`,
      {
        headers: {
          Authorization: `${localStorage.getItem(
            "username"
          )}:${localStorage.getItem("password")}`,
        },
      }
    );
    if (response.data.success) {
      dispatch({
        type: "SET_WISHLIST",
        payload: response.data.updatedWishlist,
      });
      toast.success("product removed from wishlist")
    }
  } catch (error) {
    console.error("error while removing", error);
  }
};

export const addToWishList = async ({ product, dispatch }) => {
  try {
    const response = await axios.post(
      "https://ecom.amansethi00.repl.co/wishlist",
      { productId: product._id },
      {
        headers: {
          Authorization: `${localStorage.getItem(
            "username"
          )}:${localStorage.getItem("password")}`,
        },
      }
    );
    if (response.data.success) {
      dispatch({
        type: "SET_WISHLIST",
        payload: response.data.updatedWishlist,
      });
      toast.success("product added to wishlist")
    } else {
      console.log("clicked")
      toast.info(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async ({ product, dispatch }) => {
  const { _id } = product;
  console.log(_id);
  try {
    const response = await axios.post(
      "https://ecom.amansethi00.repl.co/cart",
      { productId: _id, quantity: 1 },
      {
        headers: {
          Authorization: `${localStorage.getItem(
            "username"
          )}:${localStorage.getItem("password")}`,
        },
      }
    );
    if (response.data.success) {
      console.log("Success");
      dispatch({
        type: "SET_CART",
        payload: response.data.updatedCartInstancee,
      });
      toast.success("product added to cart")
    } else {
      toast.info(response.data.message)
      console.log("Error");
    }
  } catch (error) {
    console.log(error);
  }
};
