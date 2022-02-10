import React from 'react'
import Loader from "react-loader-spinner";

const LoaderIcon = () => {
  return (
    <div className='w-screen h-screen z-10 fixed top-0 select-none  '>
      <div className='w-full h-full flex justify-center items-center ' >
        <Loader
          type="BallTriangle	"
          color="var(--primary-color)"
          height={100}
          width={100}
        // timeout={1000000} //3 secs
        />
      </div>
    </div>
  )
}

export default LoaderIcon;
