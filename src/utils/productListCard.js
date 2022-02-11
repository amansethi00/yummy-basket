import axios from "axios";
import { toast } from "react-toastify";

export const deleteFromWishList = async ({ product, dispatch, setLoader }) => {
  try {
    setLoader(true);
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
    toast.error("error in deleting product from wishlist");
    console.error("error while removing", error);
  } finally {
    setLoader(false);
  }
};

export const addToWishList = async ({ product, dispatch,setLoader }) => {
  try {
    setLoader(true);
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
    toast.error("error in adding product to wishlist");
    console.error(error);
  } finally {
    setLoader(false);
  }
};

export const addToCart = async ({ product, dispatch ,setLoader }) => {
  const { _id } = product;
  try {
    setLoader(true);
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
      dispatch({
        type: "SET_CART",
        payload: response.data.updatedCartInstancee,
      });
      toast.success("product added to cart")
    } else {
      toast.info(response.data.message)
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoader(false);
  }
};
