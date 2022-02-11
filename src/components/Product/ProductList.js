import { useState, useEffect } from "react";
import { ProductListForm } from "./ProductListForm";
import { ProductData } from "./ProductData";
import axios from "axios";
import { useCart } from "../../context/cart-context";
import { Link } from "react-router-dom";
import LoaderIcon from "../Loader";

export function ProductList() {
  const [sliderValue, setSliderValue] = useState(1200);
  const [loader,setLoader] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, value: { data,cart } } = useCart();
  useEffect(() => {
    const anonFun = async () => {
      try {
        const getProducts = await axios.get(
          "https://ecom.amansethi00.repl.co/products"
        );
        if (getProducts.data.success) {
          dispatch({ type: "SET_PRODUCTS", payload: getProducts.data });
        } else {
          setError(getProducts.data.message);
        }
      } catch (error) {
        setError(error);
      }
    };
    anonFun();
  }, []);

  useEffect(() => {
    const getAndSetCart = async () => {
      try {
        const response = await axios.get(
          "https://ecom.amansethi00.repl.co/cart",
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
            payload: response.data,
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAndSetCart();
  }, []);
  useEffect(() => {
    const getAndSetWishlist = async () => {
      try {
        const response = await axios.get(
          "https://ecom.amansethi00.repl.co/wishlist",
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
            payload: response.data.productsInWishlist,
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAndSetWishlist();
  }, []);
  return (
    <div className="text-center">
      {error && <h2>{error}</h2>}
      <h2 >Product Listing</h2>
      <ProductListForm
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      {
        (data.length === 0 && <LoaderIcon/> )
      }
      <ProductData setLoader={setLoader} sliderValue={sliderValue} />
      {loader && <LoaderIcon/>}
      {cart.length > 0 && <Link to={'/cart'}><button className='secondary btn-secondary outline px-4 py-2 rounded-md mt-4'>Go to Cart</button></Link>}
    </div>
  );
}
