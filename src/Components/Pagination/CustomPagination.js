import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff",
            fontSize:'1em',
            marginRight:'0.3em'
        }
    }
}));
const CustomPagination = ({setPage,noofPages=15}) => {
    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0);
    }
    const classes = useStyles();
    return (   
        <div style={{width:"100%",display:'flex',justifyContent:'center',marginTop:'1.2em'}}>
        
            <Pagination 
            color='secondary' 
            count={noofPages} 
            onChange={(e)=>handlePageChange(e.target.textContent)}
            hideNextButton hidePrevButton
            classes={{ ul: classes.ul }}
            />
    
        </div>
    )
    }

export default CustomPagination
