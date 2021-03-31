import {createContext, useContext, useReducer, useState} from "react";
import axios from "axios";
export const CartContext = createContext();
export function CartProvider({children}) {
  const [showToast, setShowToast] = useState(false);
  const [textToast, setTextToast] = useState("");
  const postDataToServer = async ({type, item}) => {
    switch (type) {
      case "WISHLIST":
        try {
          setShowToast(true);
          setTextToast("saving to wishlist...");
          const response = await axios.patch(`/api/items/${item.id}`, {
            id: item.id,
            ...item,
            inWishlist: true,
          });
          console.log("wishlist response", response.data);
          const wishListResponse = await axios.post("/api/wishLists", {
            ...item,
          });
          console.log("wishList Response", wishListResponse.data);
        } catch (error) {
          setTextToast(error);
        } finally {
          setTextToast("saved successfully");
        }
        break;

      case "CART":
        try {
          setShowToast(true);
          setTextToast("saving to cart...");
          const responseCart = await axios.post("/api/cartLists", {
            id: item.id,
            ...item,
          });
          console.log("responseCart", responseCart.data);
        } catch (error) {
          setTextToast("error in Cart");
        } finally {
          setTextToast("saved successfully");
        }
        break;
      case "MODIFY_CART":
        try {
          setShowToast(true);
          setTextToast("saving to cart...");
          console.log("item quant", item.quantity);

          const IncrementCartResponse = await axios.patch(
            `/api/cartLists/${item.id}`,
            {
              ...item,
            }
          );
          console.log("increment cart response", IncrementCartResponse.data);
        } catch (error) {
          setTextToast("error in modify cart");
        } finally {
          setTextToast("saved successfully");
        }
        break;
      case "DELETE_FROM_CART":
        try {
          setShowToast(true);
          setTextToast("saving to cart...");
          const gettingCartLists = await axios.get("/api/cartLists");
          console.log("getting cart lists", gettingCartLists.data);
          const deleteRequestCart = await axios.delete(
            `/api/cartLists/${item.id}`
          );
          console.log("deleteRwquestCart", deleteRequestCart.status);
          const gettingNewCartLists = await axios.get("/api/cartLists");
          console.log("getting new cartlist", gettingNewCartLists.data);
        } catch (error) {
          setTextToast("error in delete from cart");
        } finally {
          setTextToast("deleted successfully");
        }
        break;
      case "DELETE_FROM_WISHLIST":
        try {
          const deleteRequestWishlist = await axios.delete(
            `/api/wishLists/${item.id}`
          );
          console.log("deleteRequestWishList", deleteRequestWishlist.status);
        } catch (error) {
          console.log(error);
        }
        break;
      default:
        return item;
    }
  };
  function reducer(state, action) {
    switch (action.type) {
      case "SET_DATA":
        console.log(action.cart);
        return {
          ...state,
          data: [...action.data],
          cart: [...action.cart],
          wishlist: [...action.wishList],
        };
      case "ADD_TO_CART":
        postDataToServer({type: "CART", item: action.item});
        return {
          ...state,
          cart: [action.item, ...state.cart],
          data: state.data.map((prev) =>
            prev.id === action.item.id ? {...prev, inCart: true} : prev
          ),
        };
      case "INCREMENT_QUANTITY":
        postDataToServer({
          type: "MODIFY_CART",
          item: {
            ...action.item,
            quantity:
              state.cart.filter((prev) => prev.id === action.item.id)[0][
                "quantity"
              ] + 1,
          },
        });
        return {
          ...state,
          cart: state.cart.map((prev) =>
            prev.id === action.item.id
              ? {...prev, quantity: prev.quantity + 1}
              : prev
          ),
        };
      case "DECREMENT_QUANTITY":
        if (action.item.quantity > 1) {
          postDataToServer({
            type: "MODIFY_CART",
            item: {
              ...action.item,
              quantity:
                state.cart.filter((prev) => prev.id === action.item.id)[0][
                  "quantity"
                ] - 1,
            },
          });
          return {
            ...state,
            cart: state.cart.map((prev) =>
              prev.id === action.item.id
                ? {...prev, quantity: prev.quantity - 1}
                : prev
            ),
          };
        }
        postDataToServer({type: "DELETE_FROM_CART", item: {...action.item}});

        return {
          ...state,
          cart: state.cart.filter((prev) => prev.id !== action.item.id),
          data: state.data.map((prev) =>
            prev.id === action.item.id ? {...prev, inCart: false} : prev
          ),
        };
      // return action.item.quantity > 1
      //   ? {

      //       ...state,
      //       cart: state.cart.map((prev) =>
      //         prev.id === action.item.id
      //           ? {...prev, quantity: prev.quantity - 1}
      //           : prev
      //       ),
      //     }
      //   : {
      //       ...state,
      //       cart: state.cart.filter((prev) => prev.id !== action.item.id),
      //       data: state.data.map((prev) =>
      //         prev.id === action.item.id ? {...prev, inCart: false} : prev
      //       ),
      //     };
      case "SORT_LOW_TO_HIGH":
        return {...state, sortBy: "SORT_LOW_TO_HIGH"};
      case "SORT_HIGH_TO_LOW":
        return {...state, sortBy: "SORT_HIGH_TO_LOW"};
      case "TOGGLE_OUT_OF_STOCK":
        return {...state, includeOutOfStock: !state.includeOutOfStock};
      case "TOGGLE_FAST_DELIVERY":
        return {...state, fastDelivery: !state.fastDelivery};
      case "ADD_TO_WISHLIST":
        postDataToServer({
          type: "WISHLIST",
          item: action.item,
        });
        return {
          ...state,
          data: state.data.map((prev) =>
            prev.id === action.item.id ? {...prev, inWishlist: true} : prev
          ),
          wishlist: state.wishlist.concat(action.item),
        };
      case "REMOVE_FROM_WISHLIST":
        postDataToServer({type: "DELETE_FROM_WISHLIST", item: action.item});
        return {
          ...state,
          data: state.data.map((prev) =>
            prev.id === action.item.id ? {...prev, inWishlist: false} : prev
          ),
          wishlist: state.wishlist.filter((prev) => prev.id !== action.item.id),
        };
      case "RESET":
        return {
          ...state,
          sortBy: null,
          fastDelivery: false,
          includeOutOfStock: false,
        };
      default:
        return {...state};
    }
  }
  const [value, dispatch] = useReducer(reducer, {
    data: [],
    cart: [],
    wishlist: [],
    sortBy: null,
    includeOutOfStock: false,
    fastDelivery: false,
  });
  console.log(value);

  return (
    <CartContext.Provider
      value={{value, dispatch, showToast, textToast, setShowToast}}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
