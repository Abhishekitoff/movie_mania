import React, { useEffect, useState } from 'react'
import Topnav from './navTemp/Topnav'
import { useNavigate } from 'react-router-dom'
import Dropdoun from './navTemp/Dropdoun'
import axios from '../utils/axios'
import Cards from './navTemp/Cards'
import Loding from './Loding'
import InfiniteScroll from 'react-infinite-scroll-component';


const TvShows = () => {

    document.title=("MovieFlix || Tv Shows")

    const navigate = useNavigate();
    const [category, setcategory] = useState("top_rated")
    const [tvShows, settvShows] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  
    const gettvShows = async () => {
        try {
          const { data } = await axios.get(`/tv/${category}?page=${page}`);
  
          if(data.results.length>0){
        //   settrending(data.results)
             settvShows((pre)=>[...pre, ...data.results])
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
            if (tvShows === 0) {
                gettvShows()
                
            }else{
                setpage(1);
                settvShows([])
                gettvShows()
            }
  
      }
  
      useEffect(() => {
        refreshHandler()
      }, [category])
  
  
  return (
    tvShows.length>0 ?
    <div className='  w-screen h-screen '>

        <div className="w-full flex items-center px-[4%] pt-10">
            <h1 className=' text-2xl font-semibold text-zinc-300 w-[20%]'>
            <i className="ri-arrow-left-line hover:text-[#1CE783]" onClick={()=> navigate(-1)}></i>
                Tv Shows</h1>

            <Topnav/>
           <div className='flex w-[22%] gap-5'>
           <Dropdoun title='Category' options={['airing_today','on_the_air','popular','top_rated']} func={(e)=>setcategory(e.target.value)}/>
           
           </div>


        </div>

        <InfiniteScroll
            dataLength={tvShows.length}
            next={gettvShows}
            hasMore={hasMore}
            loader={ <div></div> }
        
        >
            <Cards data={tvShows} title='tv'/>

        </InfiniteScroll>

       
    </div> : (<Loding/>)
  )
}

export default TvShows