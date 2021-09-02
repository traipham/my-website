import React from 'react'
import styles from './loading.css';


let loadingId = 0;
export default class Loading extends React.Component{
    constructor(props){
        super(props)

        // this.state({
        //     display: false
        // })
        
    // this.displayLoading = this.displayLoading.bind(this); 
    }

    componentWillUnmount(){
        clearInterval(loadingId);
    }

    componentDidMount(){
        console.log('loading Mounted!');
        document.getElementById('loading-container').style.display = "block";
        let dotNum = 0;
        loadingId = setInterval(() => {
            if (this.props.loading) {
                const dot = ' .';
                document.getElementById('loading-msg').innerHTML = 'Loading' + dot.repeat(dotNum);
                // console.log(document.getElementById('loading-msg').innerHTML);
                dotNum++;
                if (dotNum === 4) {
                    dotNum = 0;
                }
            } else {
                document.getElementById('loading-msg').innerHTML = 'Loading'
                document.getElementById('loading-container').style.display = "none";
                clearInterval(loadingId);
                console.log("Successfully stopped interval!");
            }
        }, 300)
    }

    render(){
        return(
            <div>
                <div className='loading' id="loading-container" >
                    <p id="loading-msg">Loading</p>
                    <p id="warning-msg">(don't click anything please!)</p>
                </div>
            </div>
        )
    }
}