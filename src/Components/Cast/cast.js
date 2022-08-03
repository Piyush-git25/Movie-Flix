
import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from 'axios';
import { img_300, noPicture } from '../../Config/config';
import './cast.css'
const Cast = ({media_type,id}) => {
    const [name, setName] = useState([]);
    const items = 
        name.map((c) => {
            return (<div className="cast" onClick={() => window.open(`https://www.google.com/search?q=${c?.name}`, "_blank")}>
                <img src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture} alt="Not Available" className='castimg' />
                <b className="castname">{c?.name}</b>
            </div>)
        });
    const responsive ={
        0:{
            items:5,
        },
        520:{
            items:6,
        },
        820: {
            items: 7,
        },
        1024:{
            items :8,
        }
    };
    const fetchdata = async () => {
      const{data}=  await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
      setName(data.cast);
    }
    useEffect(() => {
        fetchdata();
    }, [name]);
  return (
      <AliceCarousel autoPlay responsive={responsive} mouseTracking items={items} disableButtonsControls disableDotsControls    />
  );
}
export default Cast;