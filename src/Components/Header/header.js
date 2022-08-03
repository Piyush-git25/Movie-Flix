import React from 'react'
import './header.css';
import MovieIcon from '@material-ui/icons/Movie';
import LiveTvIcon from '@material-ui/icons/LiveTv';
const Header = () => {
    return (
        <>
            <span className="header" onClick={()=>window.scroll(0,0)}>
            <MovieIcon className='icons'    />Entertainment 4U <LiveTvIcon className='icons' /> 
            </span>  
        </>
    )
}

export default Header
