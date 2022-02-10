import React from "react";
import { Link, Router, useNavigate } from "react-router-dom";

import { AddToCart, HomeSvgUrl, Pay } from "../../constant";

export const Home = () => {
  let navigate = useNavigate();

  return (
    <Link to={'/products'} >
      <div className='flex flex-col justify-center items-center w-full h-full lg:h-72 mt-1 lg:mt-4' style={{ justifyContent: 'center' }} >
      <div className='cursor-pointer w-full justify-center flex flex-col lg:flex-row ' style={{ cursor: 'pointer' }} >
        <div className='flex col w-full h-full justify-center items-center' >
        <img src={AddToCart} alt='add to cart'
          className="w-full h-full lg:h-72 cursor-pointer object-bottom object-contain"
        />
        <p>Step 1. Add to cart</p>
        </div>
        <div className='flex col w-full h-full justify-center items-center'>
        <img src={Pay} alt='make-payment'
          className="w-full h-full lg:h-72 cursor-pointer object-bottom object-contain"
        />
        <p>Step 2. Make the payment</p>
        </div>
      <div className='flex col w-full h-full justify-center items-center text-center'>
        <img src={HomeSvgUrl}
          alt='home-delivery'
          className="w-full h-full lg:h-72 cursor-pointer object-bottom object-contain"
        />
        <p>Step 3. We make sure you get a happy delivery</p>
      </div>
      </div>
    </div>   
    </Link>
    
  );
};
