import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SingleContent from '../../Components/SingleContent/singlecontent'
import './trending.css'
import CustomPagination from '../../Components/Pagination/CustomPagination'
const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const fetchTrending = async ()=>{
        
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data.results);
        setContent(data.results);
    };
    useEffect(() => {
        fetchTrending();
    }, [page])
    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {
                    content&&(content.map((c)=>( 
                        <SingleContent 
                        key={c.id}
                        id={c.id}
                        title={c.title||c.name}
                        poster={c.poster_path}
                        date={c.release_date||c.first_air_date} 
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                        />
                    )
                    ))
                }
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending
