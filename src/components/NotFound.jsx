import React from 'react'
import notFound from '../../public/404.gif'

const NotFound = () => {
  return (
    <div className='flex justify-center items-center w-screen h-screen bg-black overflow-hidden'>
        <img src={notFound} alt="" />
    </div>
  )
}

export default NotFound