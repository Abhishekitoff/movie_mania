import React, { useEffect, useState } from 'react'
import Topnav from './navTemp/Topnav'
import { useNavigate } from 'react-router-dom'
import Dropdoun from './navTemp/Dropdoun'
import axios from '../utils/axios'
import Cards from './navTemp/Cards'
import Loding from './Loding'
import InfiniteScroll from 'react-infinite-scroll-component';

const Movie = () => {

    document.title=("MovieFlix || Movie")

  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing")
  const [movie, setmovie] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getmovie = async () => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);

        if(data.results.length>0){
      //   settrending(data.results)
           setmovie((pre)=>[...pre, ...data.results])
           setpage(page+1)
        }
        else{
          sethasMore(false)
        }
  
       
        
  
      } catch (error) {
        console.log(error)
      }
    }


    const refreshHandler = ()=>{
          if (movie === 0) {
              getmovie()
              
          }else{
              setpage(1);
              setmovie([])
              getmovie()
          }

    }

    useEffect(() => {
      refreshHandler()
    }, [category])

    


  return (
    movie.length>0 ?
    <div className='  w-screen h-screen '>

        <div className="w-full flex items-center px-[4%] pt-10">
            <h1 className=' text-2xl font-semibold text-zinc-300'>
            <i className="ri-arrow-left-line hover:text-[#1CE783]" onClick={()=> navigate(-1)}></i>
                Movie</h1>

            <Topnav/>
           <div className='flex w-[22%] gap-5'>
           <Dropdoun title='Category' options={['upcoming','top_rated','now_playing']} func={(e)=>setcategory(e.target.value)}/>
           
           </div>


        </div>

        <InfiniteScroll
            dataLength={movie.length}
            next={getmovie}
            hasMore={hasMore}
            loader={ <div></div> }
        
        >
            <Cards data={movie} title='movie'/>

        </InfiniteScroll>

       
    </div> : (<Loding/>)
  )
}

export default Movie