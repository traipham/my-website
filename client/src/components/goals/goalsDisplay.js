import React, {useState, useEffect} from 'react';
import styles from './goalsDisplay.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * What each goal display will look like based on this design
 * 
 * @param {*} props - interfaction between parent and child
 */
const GoalDisplay = (props) => {
    let textColor = 'black';
    if (parseInt(props.tagColor.slice(1, 3), 16) < 100) {
        textColor = 'white'
    }

    useEffect(() => {
        // console.log(props.index);
        setTimeout(() => {
            if (document.getElementById("goal-container" + props.index) === null) {
                console.log('null at index: ' + props.index)
            } else {
                document.getElementById("goal-container" + props.index).style.backgroundColor = props.tagColor;
            }
        }, 300)
        document.getElementById("goal-container" + props.index).style.color = textColor;
        document.getElementById("index-" + props.index).style.border = "1px solid " + textColor;
    })

    /**
     * Make button visible when hovering over post
     * @param {*} e - event object for onMouseOver of post container 
     */
    const handleMouseOver = (e) => {
        document.getElementById("goal-delete-btn-" + props.index).style.visibility = 'visible';
    }

    /**
     * Make button hidden when moving out of post 
     * @param {*} e - event object for onMouseOut of post container
     */
    const handleOutMouse = (e) => {
        document.getElementById("goal-delete-btn-" + props.index).style.visibility = "hidden";
    }

    /**
     * Delete and re-render parent component
     * @param {*} e - event object for onClick of remove button 
     */
    const handleRemoveBtnOnClick = async (e) => {
        if (window.confirm("Are you sure you want to delete this goal?")) {
            props.removeDisplayLoading();

            const indexToDelete = props.index - 1;
            const deletePost = await axios.delete('/goals/delete/1', { data: { index: indexToDelete } });
            // console.log(deletePost);
            if (deletePost.status === 200) {
                console.log('Deleted at index: ' + indexToDelete);
                props.afterRemovalDisplay(indexToDelete);
            } else {
                console.log(deletePost.data);
            }
        } else {
            console.log("Don't delete this goal!")
        }
    }

    const flipGoal = (e) =>{
        console.log('flip it');
        if (document.getElementById('post-inner-' + props.index).style.transform == "rotateY(180deg)") {
            document.getElementById('post-inner-' + props.index).style.transform = "rotateY(0deg)";
        } else {
            document.getElementById('post-inner-' + props.index).style.transform = "rotateY(180deg)";
        }
    }

    return (
        <div className={styles["container"]} id="outter-container">
            <div className={styles["container-inner"]} id={"post-inner-" + props.index}>
                <div className={styles['goal-post']} id={"goal-container" + props.index} onMouseOver={handleMouseOver} onMouseOut={handleOutMouse} onClick={flipGoal}>
                    <button type="button" className={styles["delete-btn"]} id={"goal-delete-btn-" + props.index} onClick={handleRemoveBtnOnClick}>X</button>
                    <h4 className={styles['index']} id={"index-" + props.index} >{props.index}</h4>
                    <h3 id="date" styke={{ display: 'inline' }}>{props.date.toString().slice(0, 10)}</h3>
                    <hr />
                    <p id="content">{props.content}</p>
                </div>
                <div className={styles["container-update"]} id="post-update">
                    <button className="flip" id={"flip-btn-" + props.index} onClick={flipGoal}>FLIP</button>
                    <form>
                        <label className="update" id="update-goal">Update this goal</label>
                        <input type="text" className="new-goal" id="inp-goal" htmlFor="update"></input>

                        <button type="submit" className="submit-btn" id="goal-update">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

//Checks for propTypes to be required and correct data type
GoalDisplay.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    tagColor: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
}

export default GoalDisplay;
