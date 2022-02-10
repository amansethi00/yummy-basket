import {useCart} from "../../context/cart-context";
import {IncDecButton} from "../Button/IncDecButton";
import axios from "axios";
import "./Cart.css";
import { useState } from "react";
import LoaderIcon from "../Loader";
export function CartList() {
  const {
    value: {cart},
    dispatch,
  } = useCart();
  const [loader,setLoader] = useState(false);
  console.log(cart);
  // const filteredCart = cart.filter((item) => item.productId);
  // console.log({filteredCart});

  return (
    <div className=" flex col justify-content-center align-items-center">
      <h2 className='text-lg font-bold mb-4' > My Cart</h2>
      {/* <ul class="list-group"> */}
        <table>
          <tr class='border-2' >
            <th >Item</th>
            <th className='border-2' >Quantity</th>
            <th className='border-2'>Price</th>
            <th>Total Price (Quantity * Price)</th>
          </tr>
        {cart.map((item) => {
          return (
            <tr className="border-2">
              <td className="m-1 flex row">
                <img
                  src={item?.productId?.image}
                  className="card-image"
                  style={{width: "5rem", height: "100%"}}
                  alt="product-img"
                />
                <div className="pd-left-half flex col  justify-content-space-between">
                  <div className="">{item?.productId?.name}</div>
                  <div className="row flex align-items-center ">
                    <div style={{width: "5rem"}}>
                      <IncDecButton
                        cart={cart}
                        product={item.productId}
                        dispatch={dispatch}
                        setLoader={setLoader}
                        itemQuantity={item.quantity}
                      />
                    </div>
                    
                  </div>
                </div>
              </td>
              <td className='pl-2 sm:pl-6' >{item?.quantity}</td>
              <td className="sm pd-left-1">
                      ₹{item?.productId?.price}
                    </td>
              <td className="bold pl-1 sm:pl-4">
                ₹{item?.productId?.price * item.quantity}
              </td>
            </tr>
          );
        })}
        </table>

      {/* </ul> */}
      <div className="bold my-4">
        <p className='' >
          {" "}
          TOTAL: ₹
          {cart.reduce(
            (a, b) =>
              parseInt(a) +
              parseInt(b?.productId?.["price"]) * parseInt(b?.["quantity"]),
            0
          )}
        </p>
        {/* <br /> */}
        <button className="btn mt-4 btn-primary-md">Checkout</button>
      </div>
      {loader && <LoaderIcon/>}
    </div>
  );
}
