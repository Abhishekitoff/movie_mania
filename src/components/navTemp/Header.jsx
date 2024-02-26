import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ data }) => {

    return (
        <div style={
            {
                background: ` linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.5),rgba(0,0,0,.6)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || s.profile_path})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }
        } className='sm:w-full sm:h-[70vh] h-[50vh] flex flex-col justify-end items-start p-[7%]'>

            <h1 className='text-4xl font-black text-white'>{data.name || data.original_title || data.original_name}</h1>
            <p className='hidden sm:block sm:w-1/2 text-white mt-3 mb-5'>{data.overview.slice(0, 200)}....<Link to={`/${data.media_type}/details/${data.id}`}className='text-blue-300'>more</Link></p>
            <p className='text-white '><i className="ri-megaphone-fill text-yellow-500"></i>{data.release_date}
                <i className="ri-album-fill text-yellow-500 ml-5"></i>{data.media_type.toUpperCase()}
            </p>

            <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='p-3 rounded text-black font-semibold mt-5 bg-[#1CE783]  cursor-pointer'> <i className="ri-play-circle-line"></i> Watch Trailer</Link>

           
        </div>
    )
}

export default Header