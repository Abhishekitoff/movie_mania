import React, { useEffect, useState } from 'react'
import Topnav from './navTemp/Topnav'
import { useNavigate } from 'react-router-dom'
import Dropdoun from './navTemp/Dropdoun'
import axios from '../utils/axios'
import Cards from './navTemp/Cards'
import Loding from './Loding'
import InfiniteScroll from 'react-infinite-scroll-component';

const People = () => {
    document.title=("MovieFlix || Person")

    const navigate = useNavigate();
    const [category, setcategory] = useState("popular")
    const [person, setperson] = useState([])
    const [page, setpage] = useState(1)
    const [hasMore, sethasMore] = useState(true)
  
    const getperson = async () => {
        try {
          const { data } = await axios.get(`/person/${category}?page=${page}`);
  
          if(data.results.length>0){
        //   settrending(data.results)
             setperson((pre)=>[...pre, ...data.results])
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
            if (person === 0) {
                getperson()
                
            }else{
                setpage(1);
                setperson([])
                getperson()
            }
  
      }
  
      useEffect(() => {
        refreshHandler()
      }, [category])


  return (
    person.length>0 ?
    <div className='  w-screen h-screen '>

        <div className="w-full flex items-center px-[4%] pt-10">
            <h1 className=' text-2xl font-semibold text-zinc-300'>
            <i className="ri-arrow-left-line hover:text-[#1CE783]" onClick={()=> navigate(-1)}></i>
                Person</h1>

            <Topnav/>
           <div className='flex w-[22%] gap-5'>
           
           
           </div>


        </div>

        <InfiniteScroll
            dataLength={person.length}
            next={getperson}
            hasMore={hasMore}
            loader={ <div></div> }
        
        >
            <Cards data={person} title='person'/>

        </InfiniteScroll>

       
    </div> : (<Loding/>)
  )
}

export default People