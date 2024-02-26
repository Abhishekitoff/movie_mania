import React from 'react'
import Loder from '../../public/loder.gif'

const Loding = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-black overflow-hidden'>
        <img src={Loder} alt="" />
    </div>
  )
}

export default Loding