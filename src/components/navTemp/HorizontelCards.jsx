import React from 'react';
import { Link } from 'react-router-dom';


const HorizontelCards = ({ data }) => {
    return (
        <div className='w-full p-5'>
            <div className="w-[100%] flex overflow-x-auto overflow-y-hidden h-[40vh]  rounded-lg">
                { data.length>0 ? data.map((d, i) => (
                    <Link to={`/${d.media_type}/details/${d.id}`}
                        key={i}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,.1), rgba(0,0,0,.2),rgba(0,0,0,.3)), url(https://image.tmdb.org/t/p/original/${d.backdrop_path || d.poster_path})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover"
                        }}
                        className='sm:min-w-[15%] min-w-[60%] mr-3 bg-zinc-900 mb-5 relative rounded-lg hover:scale-105 duration-200 cursor-pointer'
                    >
                        <div className='p-2 absolute bottom-0'>
                            <h1 className='text-xl font-semibold text-white'>
                                {d.title || d.original_title || d.original_name}
                            </h1>
                        </div>
                    </Link> 
                )): <h1 className='text-3xl text-white font-black mt-5 '>Nothing to Show</h1>}
            </div> 
        </div> 
    );
};

export default HorizontelCards;
