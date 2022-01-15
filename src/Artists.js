import React from 'react';
import {Dropdown} from 'semantic-ui-react';

export default function Artists (props) {

    const handleOnChange = (e, data) => {
        props.onArtistChange(data.value);
    }

    return(
        <Dropdown className='mt-3 button' placeholder={props.placeholder} search selection options={props.options} onChange={handleOnChange} value={props.value}/>
    )
}
