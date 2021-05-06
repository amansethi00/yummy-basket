// import {useEffect, useState} from "react";
// import {useCart} from "./context/cart-context";
// import axios from "axios";
// export function useAxios() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const {dispatch} = useCart();
//   const getData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("/api/items");
//       console.log("Response data use", response.data.items);
//       const cartResponse = await axios.get("/api/cartLists");
//       const wishListResponse = await axios.get("/api/wishLists");
//       dispatch({
//         type: "SET_DATA",
//         data: response.data.items,
//         cart: cartResponse.data.cartLists,
//         wishList: wishListResponse.data.wishLists,
//       });
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getData();
//   }, []);
//   return {loading, error};
// }
