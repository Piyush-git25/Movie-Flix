import React, { useState, useEffect } from 'react'
import {   Tabs, Tab } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../Components/SingleContent/singlecontent';
import './search.css'
import '../Trending/trending.css'
const Search = () => {
 
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState();
    const [noofPages, setNoofPages] = useState();
    const fetchSearch=async()=>{
    const {data}=await axios.get(
            `https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&query=${searchText}&page=${page}`
        );
        setContent(data.results);
        setNoofPages(data.total_pages);
    }
    useEffect(() => {
        fetchSearch();
    }, [type,page])
    return (
        <>
        <div className='form'>
        <form onSubmit={(e)=>{ e.preventDefault(); fetchSearch();}}>
                    <input 
                    type="text" id='query' value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                    autoFocus placeholder='Search Here'
                    />
                    <button type='submit' id='btn'><SearchIcon style={{ color: 'white', background: 'none' }} /></button>
        </form>
            
            </div>
            <Tabs value={type} indicatorColor='primary' 
            style={{paddingBottom:5,color:'white'}}
            onChange={(e,val)=>{
                setType(val);
                setPage(1);
            }} >
                <Tab label="Search Movies" className='tabs'/>
                <Tab label="Search TV Series" className='tabs' />
            </Tabs>
            <div className="trending">
                {
                    content && (content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            title={c.title || c.name}
                            poster={c.poster_path}
                            date={c.release_date || c.first_air_date}
                            media_type={type?"tv":"movie"}
                            vote_average={c.vote_average}
                        />
                    )
                    ))
                }
            </div>
            {
            (noofPages>1)&&
            <CustomPagination setPage={setPage} noofPages={noofPages} />
            }
        </>
    )
}

export default Search
