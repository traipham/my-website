import React, {useState, useEffect} from 'react';
import useWindowSize from 'react-use-window-size'
import NewConfetti from 'react-confetti';

const OnClickConfetti = (props) => {

    // const {width, height} = useWindowSize();
    // console.log(width, height);
    return( 
        <div>
            <NewConfetti numberOfPieces={300} initialVelocityY={10} friction={0.9} recycle={false} tweenDuration={5000} onConfettiComplete={props.resetConfetti}/>
        </div>
    )
}

export default OnClickConfetti;