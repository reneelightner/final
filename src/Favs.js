import React from 'react';

export default function Favs(props) {

    const handleClick = () => {
        props.artistSelection(props.artist);
    }

    const handleRemove = () => {
        props.handleAristRemove(false, props.artist);
    }

    return(
        <div>
            <button className='btn btn-outline-primary btn-sm' onClick={handleRemove}>X</button>
            <button className='btn btn-primary btn-sm' onClick={handleClick}>{props.artist}</button>  
        </div>
    )
}