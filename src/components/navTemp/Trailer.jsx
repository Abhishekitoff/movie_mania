import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import NotFound from '../NotFound';
const Trailer = () => {
    const navigate = useNavigate()
   const {pathname} = useLocation();
   const category = pathname.includes("movie") ? "movie" : "tv";
   const ytvideo = useSelector((state) => state[category].info.videos) 
  return (
    <div className='absolute w-screen h-screen bg-[rgba(0,0,0,.9)] flex items-center justify-center top-0 left-0 z-[100]'>
         <Link className="text-5xl text-white right-[5%] top-[5%] absolute ri-close-fill hover:text-[#1CE783]" onClick={() => navigate(-1)}></Link>


        {
            ytvideo ? <ReactPlayer

            height={500}
            width={1000}
            controls
            
            url={`https://www.youtube.com/watch?v=${ytvideo.key}`}/> : <NotFound/>
        }
    </div> 
  )
}

export default Trailer