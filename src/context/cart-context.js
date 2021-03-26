import {createContext, useContext, useReducer} from "react";
function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.data,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [action.item, ...state.cart],
        data: state.data.map((prev) =>
          prev.id === action.item.id ? {...prev, inCart: true} : prev
        ),
      };
    case "INCREMENT_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((prev) =>
          prev.id === action.item.id
            ? {...prev, quantity: prev.quantity + 1}
            : prev
        ),
      };
    case "DECREMENT_QUANTITY":
      return action.item.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((prev) =>
              prev.id === action.item.id
                ? {...prev, quantity: prev.quantity - 1}
                : prev
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((prev) => prev.id !== action.item.id),
            data: state.data.map((prev) =>
              prev.id === action.item.id ? {...prev, inCart: false} : prev
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
        data: state.data.map((prev) =>
          prev.id === action.item.id ? {...prev, inWishlist: true} : prev
        ),
        wishlist: state.wishlist.concat(action.item),
      };
    case "REMOVE_FROM_WISHLIST":
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
export const CartContext = createContext();
export function CartProvider({children}) {
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
    <CartContext.Provider value={{value, dispatch}}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  return useContext(CartContext);
}
