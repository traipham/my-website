import React, { useState } from "react";
import styles from './goals.module.css';
import PropTypes from 'prop-types';
import GoalInterface from "./goalPostInterface";
import axios from 'axios';
import Loading from '../loading/loading';
/**
 * TODO: Remove a goal functionality
 */


/**
 * What each goal display will look like based on this design
 * 
 * @param {*} props - interfaction between parent and child
 */
export const GoalDisplay = (props) => {
    let textColor = 'black';
    if(parseInt(props.tagColor.slice(1,3), 16) < 100){
        textColor= 'white'
    }
    // Container style
    const styleContainer = {
        color: textColor,
        overflowWrap: 'break-word',
        border: "2px solid black",
        borderRadius: "5px",
        width: "300px",
        maxWidth: '200px',
        padding: "10px",
        backgroundColor: props.tagColor,
        margin: '10px'
    }
    // Delete button style
    const deleteBtnStyle = {
        border: '2px solid black',
        borderRadius: '5px',
        backgroundColor: 'red',
        float: 'right',
        visibility: 'hidden'
    }
    // Index style
    const styleIndex = {
        float: 'left',
        border: "1px solid " + textColor,
        borderRadius: "5px",
        width: 'fit-content',
        padding: '5px',
        marginRight: '10px'
    }

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
    const handleRemoveBtnOnClick = async (e) =>{
        props.removeDisplayLoading();

        const indexToDelete = props.index-1;
        const deletePost = await axios.delete('/goals/delete/1', { data: { index: indexToDelete } } );
        // console.log(deletePost);
        if(deletePost.status === 200){
            props.afterRemovalDisplay(indexToDelete);
        } else {
            console.log(deletePost.data);
        }
    }

    return(
        <div className='container' id={"goal-container" + props.index} style={styleContainer} onMouseOver={handleMouseOver} onMouseOut={handleOutMouse}>
            <button type="button" className="delete-btn" id={"goal-delete-btn-" + props.index} style={deleteBtnStyle} onClick={handleRemoveBtnOnClick}>X</button>
            <h4 id="index" style={styleIndex}>{props.index}</h4>
            <h3 id="date" styke={{display: 'inline'}}>{props.date.toString().slice(0, 10)}</h3>
            <hr/>
            <p id="content">{props.content}</p>
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

/**
 * Goals page component
 */
class Goals extends React.Component {
    // const [removeInterface, setInterfaceRemove ] = useState(false);
    constructor(props){
        super(props)

        this.state = {
            //store an array of goals, each goals have its own content and tag color (div color)
            goals:[{
                content: '',
                tagColor: '#FFFFFF',
                date: new Date(),
                index: 0
            }],
            loading: false,
            removeInterface: true
        }

        this.displayInterface = this.displayInterface.bind(this);
        this.displayGoalsFunc = this.displayGoalsFunc.bind(this);
        this.afterRemovalDisplay = this.afterRemovalDisplay.bind(this);
        this.displayLoading = this.displayLoading.bind(this);
        this.removeDisplayLoading = this.removeDisplayLoading.bind(this);
    }

    /**
     * Get goals from database and set state for display
     */
    componentDidMount(){
        this.setState({
            ...this.state,
            loading: true
        })
        setTimeout(async () => {
            const arrGoal = await axios.get('/goals/posts/').then((res) => {return res.data[0].goals});
            console.log(arrGoal);
            let goalsCount = 1;
            arrGoal.forEach((post) => {
                this.setState({
                    ...this.state,
                    loading: false,
                    goals:[...this.state.goals, {
                        content: post.content,
                        tagColor: post.tagColor,
                        date: post.date,
                        index: goalsCount++
                    }]
                })
            })
        }, 100)
    }

    /**
     * Set state of newly/recently added goal to display
     */
    displayGoalsFunc(){
        // Get goals from database
        this.setState({
            ...this.state,
            loading: true
        })
        setTimeout(async () =>{
            const arrGoal = await axios.get('/goals/posts/').then((res) => { return res.data[0].goals });
            const post = arrGoal[arrGoal.length-1];
            // Set and display current goal
            this.setState({
                removeInterface: true,
                loading: false,
                goals:[...this.state.goals, {
                    content: post.content,
                    tagColor: post.tagColor,
                    date: post.date,
                    index: arrGoal.length
                }]
            })
        }, 300)
        document.getElementById('add-goals-btn').style.visibility = 'visible';
    }

    /**
     * Set state to add interface and hides add button
     */
    displayInterface(){
        this.setState({
            ...this.state,
            removeInterface: false
        })
        document.getElementById('add-goals-btn').style.visibility = 'hidden';
    }

    /**
     * Mount loading component to parent component
     * @returns Loading component
     */
    displayLoading() {
        if (this.state.loading) {
            return <Loading loading={this.state.loading} />
        }
    }

    /**
     * Set state for loading when removing goal
     */
    removeDisplayLoading(){
        this.setState({
            ...this.state,
            loading: true
        })
    }

    /**
     * Set a new array state without deleted goal
     * @param {*} indexToDelete - index of goal that w'ere going to delete 
     */
    afterRemovalDisplay(indexToDelete){
        let arrWish = this.state.goals;
        arrWish.splice(indexToDelete+1, 1);
        for(let i = indexToDelete+1; i < arrWish.length; i++){
            arrWish[i].index -= 1;
        }
        this.setState({
            ...this.state,
            loading: false,
            goals: arrWish
        })
    }

    render() {
        return (
            <div className={styles.page}>
                <h1 className={styles['header']} id="goals-header">Goals</h1>
                <button type="button" className="add-interface-btn" id="add-goals-btn" style={{visibility: 'visible'}} onClick={this.displayInterface}>Add Goals</button>
                {
                    this.state.removeInterface ? null : <GoalInterface displayGoalsFunc={this.displayGoalsFunc}/>
                }
                {
                    this.displayLoading()
                }
                <div className={styles["goals-container"]} id="goals-container">
                    {
                        this.state.goals.slice(1).map((goal) => {
                            return <GoalDisplay key={"goal-" + goal.index} afterRemovalDisplay={this.afterRemovalDisplay} content={goal.content} tagColor={goal.tagColor} index={goal.index} date={goal.date} removeDisplayLoading={this.removeDisplayLoading}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Goals;