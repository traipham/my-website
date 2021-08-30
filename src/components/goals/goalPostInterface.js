import React, {useState} from 'react';
import axios from 'axios'
import PropTypes from 'prop-types'
import styles from './goals.module.css';

/**
 * This file will be where I learn about Hooks and component functions. I learned how to transfer information
 * of child component to parent component using state.
 * 
 * 7/26 TODO:
 *  - Get infromation and display it/append it to the interface container
 *  - Problem with appending, it does not append due to error about Node
 */
export const GoalInterface = (props) => {
    const [contentInp, setContent] = useState("content");
    const [tagColorInp, setTagColor] = useState('#000000');

    /**
     * Set tagColor state
     * @param {*} e - event object for onChange of color input 
     */
    const handleOnChangeTagColor = (e) => {
        setTagColor(e.target.value);
    }

    /**
     * Set content state
     * @param {*} e - event object for onChange of content input 
     */
    const handleOnChangeContent = (e) => {
        setContent(e.target.value);
    }
    
    /**
     * Submits the form
     */
    const handleSubmit = async (e) => {
        // Prevent form from reloading page
        e.preventDefault();

        // Create post object that'll be used as input
        const goalPost = {
            content: contentInp,
            tagColor: tagColorInp
        }
        // SOME COMMENT HERE
        // Use add goal post route
        const success = await axios.post('/goals/addGoal', goalPost);
        console.log(success);

        // Send information back to parent component
        if(success.status === 200){
            props.displayGoalsFunc();
            // else log error
        } else {
            console.log(success.data)
        }
    }

    return (
        <div className={styles['content-interface']}>
            <form onSubmit={handleSubmit}>
                {/**
                 * Content
                 */}
                <div className={styles["inp-container"]} id="goal-content-container">
                    <label className="add-content" id={styles['add-content']}><b>Content</b></label>
                    <input className="inp-content" id="inp-content" htmlFor="add-content" placeholder="content" onChange={handleOnChangeContent}></input>
                </div>
                {/**
                 * Color
                 */}
                <div className={styles["inp-container"]} id="goal-color-container">
                    <label className="add-color" id={styles['add-color']}><b>Tag Color</b></label>
                    <input type='color' className="inp-color" id="inp-color" htmlFor="add-color" onChange={handleOnChangeTagColor}></input>
                </div>

                <button type="submit" className={styles['submit-btn']} id="submit-goal-post-btn" >Confirm Change</button>
            </form>
        </div>
    );
}

GoalInterface.propTypes = {
    displayGoalsFunc: PropTypes.func.isRequired
}

export default GoalInterface;