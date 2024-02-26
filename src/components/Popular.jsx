
import React, { useEffect, useState } from 'react'
import Topnav from './navTemp/Topnav'
import { useNavigate } from 'react-router-dom'
import Dropdoun from './navTemp/Dropdoun'
import axios from '../utils/axios'
import Cards from './navTemp/Cards'
import Loding from './Loding'
import InfiniteScroll from 'react-infinite-scroll-component';

const Popular = () => {

  document.title=("MovieFlix || Popular")

  const navigate = useNavigate();
  const [category, setcategory] = useState("movie")
  const [popular, setpopular] = useState([])
  const [page, setpage] = useState(1)
  const [hasMore, sethasMore] = useState(true)

  const getpopular = async () => {
      try {
        const { data } = await axios.get(`${category}/popular?page=${page}`);

        if(data.results.length>0){
      //   settrending(data.results)
           setpopular((pre)=>[...pre, ...data.results])
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
          if (popular === 0) {
              getpopular()
              
          }else{
              setpage(1);
              setpopular([])
              getpopular()
          }

    }

    useEffect(() => {
      refreshHandler()
    }, [category])

    




  return (
    popular.length>0 ?
    <div className='  w-screen h-screen '>

        <div className="w-full flex items-center px-[4%] pt-10">
            <h1 className=' text-2xl font-semibold text-zinc-300'>
            <i className="ri-arrow-left-line hover:text-[#1CE783]" onClick={()=> navigate(-1)}></i>
                Popular</h1>

            <Topnav/>
           <div className='flex w-[22%] gap-5'>
           <Dropdoun title='Category' options={['movie','tv']} func={(e)=>setcategory(e.target.value)}/>
           
           </div>


        </div>

        <InfiniteScroll
            dataLength={popular.length}
            next={getpopular}
            hasMore={hasMore}
            loader={ <div></div> }
        
        >
            <Cards data={popular} title=''/>

        </InfiniteScroll>

       
    </div> : (<Loding/>)
  )
}

export default Popular