import React from 'react'

const useGenre = (selectedGenre) => {
    if (selectedGenre.length<1)
        return "";
    const genId=selectedGenre.map((gen)=>{
        return gen.id;
    })
    return genId.reduce((acc,curr)=>acc+','+curr);
}

export default useGenre
