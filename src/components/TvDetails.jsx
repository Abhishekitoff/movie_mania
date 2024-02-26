import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadtv, removetv } from '../store/actions/TvActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loding from "../components/Loding"
import HorizontelCards from "./navTemp/HorizontelCards"

const TvDetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    }

  }, [id])
  return info ? (
    <div style={{
      backgroundImage: ` linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.6),rgba(0,0,0,.7)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}
      className='w-screen h-[200vh] px-[10%] relative'>

      {/* part1 nav */}
      <nav className='w-full text-zinc-100 h-[10vh] items-center flex gap-10 text-2xl'>
        <Link className="ri-arrow-left-line hover:text-[#1CE783]" onClick={() => navigate(-1)}></Link>
        <a target="_blank" href={`${info.detail.homepage}`}><i className="ri-earth-fill"></i></a>
        <a target="_blank" href=""><i className="ri-external-link-line"></i></a>
        <a target="_blank" href={`https://www.imdb.com/title/${info.external.imdb_id}`}>imdb</a>
      </nav>



      {/* part2 poster */}
      <div className='w-full flex select-none'>


        <img src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path})`} alt="" className='h-[50vh] object-cover rounded-lg overflow-hidden w-[20%] mt-5 ' />

        <div className="contnet ml-10 text-white w-[80%]">
          <h1 className=' text-5xl font-black mt-3 '> {info.detail.name || info.detail.original_title || info.detail.original_name}

            <small className='text-xl font-bold text-zinc-300'>({info.detail.first_air_date.split('-')[0]})</small>
          </h1>



          <div className='flex  items-center gap-x-5 mt-3 '>
            <span className='text-white text-xl font-semibold w-[7vh] h-[7vh] flex items-center justify-center bg-purple-600 rounded-full'>{(info.detail.vote_average * 10).toFixed()} <sup>%</sup></span>

            <h1>User Score</h1>
            <h1>({info.detail.first_air_date})</h1>
            <h1>({info.detail.genres.map(g => g.name).join(",")
            })</h1>

            <h1>{info.detail.runtime}min</h1>


          </div>

          <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>


          <h1 className='text-2xl mt-5 '>Overview</h1>
          <p className='mb-10'>
            {info.detail.overview}
          </p>

          <Link className=' px-4 py-3 bg-[#1CE783] rounded-lg text-black font-semibold' to={`${pathname}/trailer`}>
            <i className="ri-play-mini-fill mr-3 text-xl"></i>
            Play Trailer</Link>


        </div>


      </div>

      {/* part3 platform available */}

      <div className='mt-8 w-[80%] gap-y-5 flex flex-col'>





        {info.watchProviders && info.watchProviders.flatrate && <div className='flex gap-x-10 font-medium items-center text-white'>
          <h1>Available on Flatrate</h1>
          {info.watchProviders.flatrate.map((w, i) => (<img key={i} title={w.
            provider_name} className='w-[5vh] h-[5vh] object-cover rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path})`} />
          ))}
        </div>
        }



        {info.watchProviders && info.watchProviders.buy && <div className='flex gap-x-10 font-medium items-center text-white'>
          <h1>Available on Rent</h1>
          {info.watchProviders.buy.map((w, i) => (<img title={w.
            provider_name} key={i} className='w-[5vh] h-[5vh] object-cover rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path})`} />
          ))}
        </div>
        }

        {info.watchProviders && info.watchProviders.buy && <div className='flex gap-x-10 font-medium items-center text-white'>
          <h1>Available on Buy</h1>
          {info.watchProviders.buy.map((w, i) => (<img key={i} title={w.
            provider_name} className='w-[5vh] h-[5vh] object-cover rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path})`} />
          ))}
        </div>
        }



      </div>


      {/* part 4 recomendtions stuff */}

      <hr className='mt-3' />

      <h1 className='text-3xl font-bold mt-10 text-white '>Sesons</h1>

      <HorizontelCards data={
        info.detail.seasons 
      } />


  {/* part 5 recomendtions stuff */}

      <hr className='mt-3' />

      <h1 className='text-3xl font-bold mt-10 text-white '> Recommendations & Similar</h1>

      <HorizontelCards data={
        info.recommendations.length > 0 ? info.recommendations : info.similar
      } />


      <Outlet />
    </div>






  ) : <Loding />
}



export default TvDetails