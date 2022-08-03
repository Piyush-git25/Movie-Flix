import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import YouTubeIcon from '@material-ui/icons/YouTube'
import {  img_500, unavailableLandscape } from '../../Config/config';
import { Button } from '@material-ui/core';
import './ContentModal.css'
import '../SingleContent/singlecontent.css'
import Cast from '../Cast/cast'
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '90%',
        height: '80%',
        color: "white",
        borderRadius: 10,
        padding: theme.spacing(1, 1, 3),
        background: '#282c34'
    },
}));

export default function ContentModal({ children, media_type, id,title}) { 
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const fetchdata = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`);
        setContent(data);
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        setVideo(data.results[0]?.key)
    }
    useEffect(() => {
        fetchdata();
        fetchVideo();
    }, [])
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div type="button" className='media' onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (<div className={classes.paper}>
                        <div className="contentmodal">
                            <img src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailableLandscape} alt={content.name || content.title} className='content_portrait' />
                            <img src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} alt={content.name || content.title} className='content_landscape' />
                            <div className="ContentModal_about">
                                <span className="ContentModal_title">
                                    {content.name || content.title}
                                     ({(content.first_air_date || content.release_date || "----").substring(0, 4)})
                                </span>
                                <i className='tagline'>{content.tagline ? content.tagline : (`Rating - ${content.vote_average}`)}</i>
                                
                                <span className="ContentModal_description">
                                    {content.overview}
                                </span>
                                <Cast  media_type={media_type} id={id}/>
                            </div>
                                <Button
                                    variant='contained'
                                    target='_blank'
                                    startIcon={<YouTubeIcon />}
                                    color='secondary'
                                href={video ? `https://www.youtube.com/watch?v=${video}` : `https://www.youtube.com/results?search_query=${title}`}
                                    style={{backgroundColor:'crimson',padding:'0.4em 1em',fontSize:'0.7em',margin:'1em 0'}}
                                >
                                    Watch Trailer
                                </Button>
                            </div>
                    </div>)
                    }
                </Fade>
            </Modal>
        </div>
    );
}
