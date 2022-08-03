import React, { useEffect } from 'react'
import axios from 'axios';
import { Chip } from '@material-ui/core';

const Genres = ({ type
            ,genre 
            ,setGenre 
            ,selectedGenre 
            ,setSelectedGenre 
            ,setPage }) => {
        const handleAdd=(genr)=>{
            setGenre(genre.filter((g) => g.id !== genr.id));
            setSelectedGenre([...selectedGenre,genr]);
            setPage(1); 
        }
    const handleRemove = (genr) => {
        setSelectedGenre(selectedGenre.filter((g) => g.id !== genr.id));
        setGenre([...genre, genr]);
        setPage(1);
    }
        const fetchGenres = async ()=>{
            const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}`);
            setGenre(data.genres);
        }    
        // console.log(genre);
        useEffect(() => {
            fetchGenres();
        }, [])
    return (
        <div style={{paddingBottom:'1em'}}>
            {selectedGenre && selectedGenre.map((gen) => <Chip
                key={gen.id}
                label={gen.name}
                style={{ margin: 0.5, borderRadius: '10px' }} color='primary' clickable
                size='medium'
                onDelete={()=>handleRemove(gen)}
            />)
            }
         { genre&&genre.map((gen)=>
         <Chip
         key={gen.id}
         label={gen.name} 
                 style={{ margin: 0.5, color:`{selectedGenre.length<=4}?'white':'cornflowerblue'`,borderRadius:'10px'}} clickable
         size='medium'
         onClick={()=>handleAdd(gen)}
         />)
         }
        </div>
    )
}

export default Genres
