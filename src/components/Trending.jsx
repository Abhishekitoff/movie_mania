import React, { useEffect, useState } from 'react'
import Topnav from './navTemp/Topnav'
import { useNavigate } from 'react-router-dom'
import Dropdoun from './navTemp/Dropdoun'
import axios from '../utils/axios'
import Cards from './navTemp/Cards'
import Loding from './Loding'
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  document.title=("MovieFlix || Trending")
    const navigate = useNavigate();
    const [category, setcategory] = useState("all")
    const [duration, setduration] = useState('day')
    const [trending, settrending] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)

    const gettrending = async () => {
        try {
          const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

          if(data.results.length>0){
        //   settrending(data.results)
             settrending((pre)=>[...pre, ...data.results])
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
            if (trending === 0) {
                gettrending()
                
            }else{
                setpage(1);
                settrending([])
                gettrending()
            }

      }

      useEffect(() => {
        refreshHandler()
      }, [category, duration])

      

  return ( trending.length>0 ?
    <div className='  w-screen h-screen '>

        <div className="w-full flex items-center px-[4%] pt-10">
            <h1 className=' text-2xl font-semibold text-zinc-300'>
            <i className="ri-arrow-left-line hover:text-[#1CE783]" onClick={()=> navigate(-1)}></i>
                Trending</h1>

            <Topnav/>
           <div className='flex w-[22%] gap-5'>
           <Dropdoun title='Category' options={['movie','tv', 'all']} func={(e)=>setcategory(e.target.value)}/>
            <Dropdoun title='Duration' options={['day', 'week']} func={(e)=>setduration(e.target.value)}/>
           </div>


        </div>

        <InfiniteScroll
            dataLength={trending.length}
            next={gettrending}
            hasMore={hasMore}
            loader={ <div></div> }
        
        >
            <Cards data={trending} title={category}/>

        </InfiniteScroll>

       
    </div> : (<Loding/>)
  )
}

export default Trending