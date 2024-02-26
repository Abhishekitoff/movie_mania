import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { asyncloadperson, removeperson } from '../store/actions/PersonActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loding from "../components/Loding"
import HorizontelCards from "./navTemp/HorizontelCards"
const PersonDetails = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    }

  }, [id])


  return info ? (
    <div className='w-screen h-[125vh] bg-[#0B0C0F] px-[7%]'>
      {/* part 1 navi */}
      <nav className='w-full text-zinc-100 h-[10vh]  items-center flex gap-10 text-2xl'>
        <Link className="ri-arrow-left-line hover:text-[#1CE783]" onClick={() => navigate(-1)}></Link>

      </nav>



      <div className='w-full flex '>
        {/* part2  poster dets*/}
        <div className="w-[25%] text-white">

          <img src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path || info.detail.backdrop_path})`} alt="" className='h-[40vh] object-cover rounded-lg overflow-hidden hover:scale-105 duration-300 mt-5 ' />

          <hr className='mt-4 bg-zinc-400  mb-3' />

          {/* social links */}

          <div className='text-2xl flex gap-x-5'>
            <a target="_blank" href={`${info.external.wikidata_id}`}><i className="ri-earth-fill"></i></a>
            <a target="_blank" href={`https://www.facebook.com/${info.external.facebook_id}`}><i className="ri-facebook-circle-fill"></i></a>
            <a target="_blank" href={`https://www.instagram.com/${info.external.instagram_id}`}><i className="ri-instagram-line"></i></a>
            <a target="_blank" href={`https://www.twitter.com/${info.external.twitter_id}`}><i className="ri-twitter-x-line"></i></a>
          </div>

          {/* personal info */}
          <h1 className='text-2xl text-zinc-400 font-semibold my-4'>Person Info</h1>





          <h1 className='text-lg text-zinc-400 font-semibold '>Known For</h1>
          <h1 className=' text-zinc-400 '>{info.detail.known_for_department
          }</h1>
          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Gender</h1>
          <h1 className=' text-zinc-400 '>{info.detail.gender === 2 ? "Male" : "Female"
          }</h1>



          <h1 className='text-lg text-zinc-400 font-semibold '>Birthday</h1>
          <h1 className=' text-zinc-400 '>{info.detail.birthday}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-3'>Death Day</h1>
          <h1 className=' text-zinc-400 '>{info.detail.deathday ? info.detail.deathday : "Still Alive"}</h1>






        </div>

        {/* part3  dets info*/}

        <div className="w-[75%] ml-[5%]">
          <h1 className='text-6xl text-zinc-400 font-black my-4 '>{info.detail.name}</h1>
          <h1 className='text-xl text-zinc-400 font-semibold '>Biography</h1>

          <p className='text-zinc-400 mt-3'>{info.detail.biography.slice(0,1000)}</p>
          <h1 className=' text-zinc-400 text-lg mt-5 font-semibold'>Famous For</h1>

          <HorizontelCards data={info.combined_credits.cast}/>

        </div>





      </div>

      {/* 
  */}

    </div>
  ) : <Loding />
}

export default PersonDetails