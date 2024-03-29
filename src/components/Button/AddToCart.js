import {useCart} from "../../context/cart-context";
import {addToCart} from "../index";
export const AddToCart = ({product, setLoader}) => {
  const {dispatch} = useCart();
  return (
    <button
      className="btn-primary-sm "
      style={{width: "100%", alignSelf: "baseline"}}
      onClick={() => addToCart({product, dispatch, setLoader})}
      disabled={product.inStock === false}
    >
      ADD TO CART
    </button>
  );
};
