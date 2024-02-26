import React, { useEffect, useState } from 'react'
import Sidenav from './navTemp/Sidenav'
import Topnav from './navTemp/Topnav'
import axios from '../utils/axios';
import Header from './navTemp/Header';
import HorizontelCards from './navTemp/HorizontelCards'
import Dropdoun from './navTemp/Dropdoun';
import Loding from './Loding';

const Home = () => {

  document.title = "Movie Flix - Watch TV Shows, Movies, Specials, Live Cricket & Football";

  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")

  const getHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randData = data.results[(Math.random() * data.results.length).toFixed()]
      setwallpaper(randData)

    } catch (error) {
      console.log(error)
    }
  }

  const gettrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);

      settrending(data.results)

    } catch (error) {
      console.log(error)
    }
  }

  console.log(trending)

  useEffect(() => {
    gettrending();
    !wallpaper && getHeaderWallpaper()
   
  }, [category])

  


  return (wallpaper && trending ?

    <>
      <Sidenav />
      <div className="sm:w-[80%] w-full h-full overflow-x-hidden overflow-auto">
        <Topnav />
        <Header data={wallpaper} />
        <div className=' p-5 flex justify-between  items-center'>
          <h1 className='sm:text-3xl text-2xl  text-zinc-400 font-semibold'>Trending</h1>

          <Dropdoun title="Filter" options={['tv', 'movie', 'all']} func={(e)=>setcategory(e.target.value)} />
        </div>
        <HorizontelCards data={trending}  />
      </div>

    </> : <Loding/>
  )
}

export default Home