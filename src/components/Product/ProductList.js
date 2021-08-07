import { useState, useEffect } from "react";
import { ProductListForm } from "./ProductListForm";
import { ProductData } from "./ProductData";
import axios from "axios";
import { useCart } from "../../context/cart-context";
import Loader from "react-loader-spinner";

export function ProductList() {
  const [sliderValue, setSliderValue] = useState(1200);
  const [error, setError] = useState(null);
  const { dispatch, value: { data } } = useCart();
  useEffect(() => {
    const anonFun = async () => {
      try {
        const getProducts = await axios.get(
          "https://ecom.amansethi00.repl.co/products"
        );
        console.log(getProducts);
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
        console.log(response);
        if (response.data.success) {
          console.log("cart console", response.data);
          console.log("Success");
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
        console.log(response);
        if (response.data.success) {
          console.log("Success");
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
      <h2>Product Listing</h2>
      <ProductListForm
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
      {
        (data.length === 0 && <Loader
          type="Puff"
          color="var(--primary-color)"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />)

      }
      <ProductData sliderValue={sliderValue} />
    </div>
  );
}
