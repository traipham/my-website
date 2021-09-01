import React from 'react'
import styles from './loading.css';

export default class Loading extends React.Component{
    constructor(props){
        super(props)
        // this.setState({
        //     display: true
        // })
        
    // this.changeLoadMsg = this.changeLoadMsg.bind(this); 
    }

    componentDidMount(){
        if (this.props.loading) {
            let dotNum = 0;
            setInterval(() => {
                const dot = ' .';
                setTimeout(() => {
                    document.getElementById('loading-msg').innerHTML = 'Loading' + dot.repeat(dotNum);
                }, 200)
                // console.log(document.getElementById('loading-msg').innerHTML);
                dotNum++;
                if (dotNum === 4) {
                    dotNum = 0;
                }
            }, 1000)
        }
    }

    render(){
        return(
            <div className="container" id="loading-container">
                <p id="loading-msg">Loading</p>
            </div>
        )
    }
}