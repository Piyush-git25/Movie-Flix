import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Singlecontent from '../../Components/SingleContent/singlecontent';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import Genres from '../../Components/Genres/genres';
import useGenre from '../../Hooks/useGenre'
import ListIcon from '@material-ui/icons/List';
import '../Movies/movies.css'
const Series = () => {  
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [noofPages, setNoofPages] = useState();
    const [genre, setGenre] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState([]);
    const genString = useGenre(selectedGenre);
    const [showGen, setShowGen] = useState(1);
    const fetchMovies = async () => {

        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=${genString}`);
        // console.log(data.results);
        setContent(data.results);
        setNoofPages(data.total_pages);
       
    };
    useEffect(() => {
        fetchMovies();
        window.scroll(0, 0);
        return () => {
            setContent([]); // This worked for me
        };
    }, [page, genString])
    useEffect(() => {
        if (window.innerWidth < 700)
            setShowGen(0);
    }, [])
    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <button onClick={() => setShowGen(!showGen)}
                className='btn'><ListIcon /></button>
            {showGen? (
                <Genres
                    type='movie'
                    genre={genre}
                    setGenre={setGenre}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                    setPage={setPage}
                />
            ):''
                // setShowGen(!showGen);
            }
            <div className="trending">
                {
                    content && (content.map((c) => (
                        <Singlecontent
                            key={c.id}
                            id={c.id}
                            title={c.title || c.name}
                            poster={c.poster_path}
                            date={c.release_date || c.first_air_date}
                            media_type='tv'
                            vote_average={c.vote_average}
                        />
                    )
                    ))
                }
            </div>
            {noofPages > 1 && <CustomPagination setPage={setPage} noofPages={noofPages} />}
        </div>
    )
}

export default Series
