import React, {useState, useEffect} from 'react';
import useWindowSize from 'react-use-window-size'
import NewConfetti from 'react-confetti';

const OnClickConfetti = (props) => {

    // const {width, height} = useWindowSize();
    // console.log(width, height);
    return( 
        <div>
            <NewConfetti numberOfPieces={300} initialVelocityY={1} friction={1} recycle={false} tweenDuration={5000}/>
        </div>
    )
}

export default OnClickConfetti;