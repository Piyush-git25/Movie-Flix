import React from 'react'
import { img_300, unavailable } from '../../Config/config'
import "./singlecontent.css"
import { Badge } from '@material-ui/core'
import ContentModal from '../ContentModal/ContentModal'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './singlecontent.css'
const Singlecontent = ({ id, title, poster, date, media_type, vote_average }) => {
    return (
        
        <ContentModal media_type={media_type} id={id} vote_average={vote_average} title={title}>
            <Badge badgeContent={vote_average ? vote_average : 'NA'} fontSize='2em' color={vote_average > 5 ? (vote_average >= 7 ? "primary" : "secondary") : "error"} />
            <img className='poster' src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title} </b>
            
            <div className='foot'>
                <span className='subtitle'>   {media_type === 'tv' ? "TV Series" : "Movie"}</span>
                <span className='subtitle'>   {date}</span>
            </div>
        </ContentModal>

    )
}

export default Singlecontent
