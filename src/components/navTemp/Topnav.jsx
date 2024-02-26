import axios from "../../utils/axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import noimage from "../../assets/NoImage.jpg"

const Topnav = () => {
    const [query, setquery] = useState('');
    const [searches, setsearches] = useState([])

    const getSearches = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`)
            setsearches(data.results)
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getSearches()
    }, [query])




    return (
        <div className='px-5 sm:w-full w-[100%] h-[10vh] relative flex justify-start items-center sm:ml-28'>
            <i className="text-zinc-400 text-3xl ri-search-fill"></i>
            <input className='w-[50%] mx-10 p-5 text-lg outline-none border-none bg-transparent text-white' type="text" placeholder='Movies shows and more' onChange={(e) => { setquery(e.target.value) }} value={query} />
            {
                query.length > 0 && (<i className="text-zinc-400 text-3xl ri-close-fill cursor-pointer" onClick={() => setquery("")}></i>)
            }
            

            <div className="sm:w-[50%] w-[70%] z-10 absolute max-h-[50vh] bg-zinc-500 top-[90%] sm:left-[5%] left-[9%]  overflow-auto ">

                {
                    searches.map((s, i) => {
                        return <Link to={`/${s.media_type}/details/${s.id}`} key={i} className="text-zinc-700 font-semibold text-xl w-full flex items-center justify-start border-b-[1px] border-zinc-100  p-2 px-4 hover:text-black hover:bg-zinc-600 duration-300 ">
                         <img src={  s.backdrop_path || s.profile_path ? `https://image.tmdb.org/t/p/original/${ s.backdrop_path || s.profile_path}` : noimage
                        } className="w-[15vh] h-[15vh] rounded object-cover mr-4" alt="" />

                           <span> {s.name || s.original_title || s.original_name}</span></Link>
                    })
                }


            </div>

        </div>
    )
}

export default Topnav