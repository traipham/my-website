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

    const [upContent, setUpContent] = useState('');

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
        if(props.isAdmin){
            console.log("I AM ADMIN!");
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
                console.log("Don't delete this goal!");
            }
        } else {
            alert("Not an Admin! Can not Remove!");
        }
    }

    const updateContent = (e) => {
        setUpContent(e.target.value);
    }

    const handleUpdatePost = async(e) => {
        e.preventDefault();
        if(props.isAdmin){
            const arrGoal = await axios.get('/goals/posts/').then((res) => { return res.data[0].goals });
            const currGoal = arrGoal[props.index - 1];
            console.log("current Goal: " + JSON.stringify(currGoal));
            const update = {
                _id: currGoal._id,
                content: upContent
            };

            const success = await axios.post("/goals/update/1", update);
            console.log(success);

            if (success.status === 200) {
                // const newArr = await axios.get('/goals/posts/').then((res) => { return res.data[0].goals });
                // console.log(newArr);
                props.updateGoalDisplay(props.index);
                flipGoal();
            } else {
                console.log(success.data);
            }
        } else {
            alert("Not an admin! Can not update!")
        }
    }

    const flipGoal = (e) =>{
        console.log('flip it');
        if (document.getElementById('post-inner-' + props.index).style.transform == "rotateY(180deg)") {
            document.getElementById('post-inner-' + props.index).style.transform = "rotateY(0deg)";
        } else {
            document.getElementById('post-inner-' + props.index).style.transform = "rotateY(180deg)";
        }
        const height = document.getElementById('goal-container' + props.index).clientHeight;
        setTimeout(() => {
            document.getElementById("post-update-" + props.index).style.height = `${height}px`;
        }, 100)
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
                <div className={styles["container-update"]} id={"post-update-" + props.index}>
                    <button className={styles["flip"]} id={"flip-btn-" + props.index} onClick={flipGoal}>FLIP</button>
                    <form onSubmit={handleUpdatePost}>
                        <label className="update" id="update-goal">Update this goal</label>
                        <textarea type="text" className="new-goal" id="inp-goal" htmlFor="update" rows="5" cols="20" onChange={updateContent}></textarea>

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
