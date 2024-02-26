import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const Sidenav = () => {
    const [menu, setmenu] = useState(true)
    return (
        <>
         <div className={`sm:w-[20%] w-[100%]  ${menu && "hidden" } sm:block h-full border-r-[1px] border-zinc-400 p-10 `}>

            <h1 className='text-2xl text-white font-bold'>  <i className="ri-tv-fill text-[#1CE783] mr-2 "></i> <span className=' '> Movie Flix</span></h1>

            <nav className='flex flex-col text-zinc-400 text-xl gap-3 mb-2'>
                <h1 className='text-white font-semibold text-xl mt-8 mb-5'>New Feeds</h1>
                <Link to="/trending" className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-fire-fill mr-2"></i>Tranding</Link>
                <Link to="/popular" className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-bard-fill mr-2"></i>Popular</Link>
                <Link to="/movie" className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-movie-fill mr-2"></i>Movies</Link>
                <Link to="/tv" className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-tv-line mr-2"></i>TV Shows</Link>
                <Link to='/person' className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-team-line mr-2 "></i>People</Link>
            </nav>
            
            <hr />
            
            <nav className='flex flex-col text-zinc-400 text-xl gap-3 '>
                <h1 className='text-white font-semibold text-xl mt-2'>Web Information</h1>
                <Link className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-information-fill mr-2"></i>About</Link>
                <Link className='hover:bg-[#1CE783]  hover:text-white rounded-lg p-2 duration-300 '><i className="ri-phone-fill mr-2"></i>Contact</Link>
                
            </nav>
           
        </div>
       {
            menu ? <i className="ri-menu-3-line sm:hidden block text-zinc-100 text-xl ml-9 absolute z-50 top-7 right-5" onClick={()=>setmenu(!menu)}></i> :<i className="absolute  sm:hidden block top-7 right-5 ri-close-fill text-white text-2xl z-[54]" onClick={() => setmenu(!menu)}>
         </i>

       } 
        
        </>
       
        
    )
}

export default Sidenav