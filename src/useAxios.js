import {useEffect} from "react";
import {useCart} from "./context/cart-context";
import axios from "axios";
export function useAxios() {
  const {dispatch} = useCart();
  const getData = async () => {
    try {
      const response = await axios.get("/api/items");
      dispatch({type: "SET_DATA", data: response.data.items});
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    return () => {
      console.log("cleaning up");
    };
  }, []);
  return {getData};
}
