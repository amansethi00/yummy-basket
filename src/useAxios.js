import {useEffect, useState} from "react";
import {useCart} from "./context/cart-context";
import axios from "axios";
export function useAxios() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {dispatch} = useCart();
  // const postDataToServer = async ({type, item}) => {
  //   switch (type) {
  //     case "WISHLIST":
  //       const response = await axios.post("/api/wishLists", {
  //         item,
  //       });
  //       console.log("wishlist response", response);
  //       return response;
  //     case "CART":
  //       const responseCart = await axios.post("/api/cartLists", {
  //         item,
  //       });
  //       console.log("cart response", responseCart);
  //       return responseCart;
  //     default:
  //       return item;
  //   }
  // };
  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/items");
      console.log("Response data use", response.data.items);
      const cartResponse = await axios.get("/api/cartLists");
      const wishListResponse = await axios.get("/api/wishLists");
      dispatch({
        type: "SET_DATA",
        data: response.data.items,
        cart: cartResponse.data.cartLists,
        wishList: wishListResponse.data.wishLists,
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return {loading, error};
}
