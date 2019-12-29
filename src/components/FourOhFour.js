import React from 'react';
import error from '../404.gif'

export default function FourOhFour() {
    return (
        <div> 
           <img src={error} style={{"margin-top":"90px"}}></img>
            {/* <iframe src="https://giphy.com/embed/GGP4dpOtItmuI" width="480" height="342"
             frameBorder="0" class="giphy-embed" allowFullScreen></iframe> */}
        </div>
    )
}
