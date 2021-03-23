import {createContext, useContext, useReducer} from "react";
import faker from "faker";
const data = [...Array(50)].map((item) => ({
  id: faker.random.uuid(),
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  inCart: false,
  fastDelivery: faker.random.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
  offer: faker.random.arrayElement([
    "Save 50",
    "70% bonanza",
    "Republic Day Sale",
  ]),
  idealFor: faker.random.arrayElement([
    "Men",
    "Women",
    "Girl",
    "Boy",
    "Senior",
  ]),
  level: faker.random.arrayElement([
    "beginner",
    "amateur",
    "intermediate",
    "advanced",
    "professional",
  ]),
  color: faker.commerce.color(),
}));

const reducer = (state, action) => {
  switch (action.type) {
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
    default:
      return {...state};
  }
};
export const CartContext = createContext();
export function CartProvider({children}) {
  const [value, dispatch] = useReducer(reducer, {data, cart: []});
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
