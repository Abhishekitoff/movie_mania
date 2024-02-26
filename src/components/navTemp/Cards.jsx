import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  console.log(title)
  return (
    <div className='flex flex-wrap w-full px-[3%]  mt-10  bg-[#0B0C0F]  '>
      {
        data.map((c, i) => {
          return <Link key={i} to={`/${c.media_type || title}/details/${c.id}`} className='w-[25vh] mr-[5%] mb-[5%]  relative '>
            <img src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path})`} alt="" className='h-[40vh] object-cover rounded-lg overflow-hidden hover:scale-110 duration-300' />
            <h1 className='text-zinc-400 text-xl font-semibold mt-3'> {c.name || c.original_title || c.original_name}</h1>

            {
              c.vote_average ? <div className='text-white text-xl font-semibold absolute right-[-10%] top-[50%] w-[7vh] h-[7vh] flex items-center justify-center bg-purple-600 rounded-full'>{(c.vote_average * 10).toFixed()} <sup>%</sup></div> : null
            }
          </Link>
        })
      }
    </div>
  )
}

export default Cards