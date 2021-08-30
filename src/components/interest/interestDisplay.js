import React from 'react';
import axios from 'axios';
import styles from './interest.module.css';
import Interest from './interest';

const InterestDisplay = (props) =>{

    const handleOnMouseOverInterest = () => {
        document.getElementById('del-btn-'+props.index).style.visibility = 'visible';
    }

    const handleOnMouseOutInterest = () => {
        document.getElementById('del-btn-' + props.index).style.visibility = 'hidden';
    }

    const removeButtonOnClick = async () =>{
        const indexToDelete = props.index-1;
    }
    
    return(
        <div id={props.index} onMouseOver={this.handleOnMouseOverInterest} onMouseOut={this.handleOnMouseOutInterest}>
            <p key={"p-li-" + props.index} id={'pers-interest-' + props.index}>
                {props.interest}
                {props.date.toString().slice(0, 10)}
                <button type="button" className={styles["delete-btn"]} id={'del-btn-' + props.index} onClick={this.deletePersBtnOnClick}>X</button>
            </p>
        </div>
    )
}

export default InterestDisplay;