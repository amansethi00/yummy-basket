import {createContext, useContext, useReducer, useState} from "react";
import axios from "axios";
export const CartContext = createContext();
export function CartProvider({children}) {
  const [showToast, setShowToast] = useState(false);
  const [textToast, setTextToast] = useState("");

  function reducer(state, action) {
    switch (action.type) {
      case "SET_PRODUCTS":
        return {
          ...state,
          data: [...action.payload.products],
        };
      case "SET_CART":
        return {
          ...state,
          cart: [...action.payload.products],
        };
      case "SET_WISHLIST":
        return {
          ...state,
          wishlist: [...action.payload.products],
        };
      case "UPDATE_PRODUCTS":
        return {
          ...state,
          data: state.data.map((prev) =>
            prev.id === action.item.productId ? {...action.item} : prev
          ),
        };
      case "DELETE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((prev) => prev.id !== action.item.id),
        };
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [action.item, ...state.cart],
        };
      case "INCREMENT_QUANTITY":
        return {
          ...state,
          cart: state.cart.map((prev) =>
            prev.id === action.item.id ? action.item : prev
          ),
        };
      case "DECREMENT_QUANTITY":
        return {
          ...state,
          cart: state.cart.map((prev) =>
            prev.id === action.item.id ? action.item : prev
          ),
        };
      case "SORT_LOW_TO_HIGH":
        return {...state, sortBy: "SORT_LOW_TO_HIGH"};
      case "SORT_HIGH_TO_LOW":
        return {...state, sortBy: "SORT_HIGH_TO_LOW"};
      case "TOGGLE_OUT_OF_STOCK":
        return {...state, includeOutOfStock: !state.includeOutOfStock};
      case "TOGGLE_FAST_DELIVERY":
        return {...state, fastDelivery: !state.fastDelivery};
      case "ADD_TO_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.concat(action.item),
        };
      case "DELETE_FROM_WISHLIST":
        return {
          ...state,
          wishlist: state.wishlist.filter(
            (prev) => prev.productId !== action.item.productId
          ),
        };
      case "RESET":
        return {
          ...state,
          sortBy: null,
          fastDelivery: false,
          includeOutOfStock: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          cart:[],
          wishlist:[],
        }
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

  return (
    <CartContext.Provider
      value={{
        value,
        dispatch,
        showToast,
        textToast,
        setShowToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
