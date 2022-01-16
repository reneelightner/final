import React from 'react';

export default function FavBtn(props) {

    const handleClick = () => {
        props.handleFavArtist(true, props.artist);
    }

    return (
        <button className='btn btn-light' onClick={handleClick}>❤️</button>
    )

}