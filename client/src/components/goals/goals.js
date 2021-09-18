import React, { useState, useEffect } from "react";
import Reward from 'react-rewards';
import styles from './goals.module.css';
import GoalInterface from "./goalsPostInterface";
import GoalDisplay from './goalsDisplay';
import axios from 'axios';
import Loading from '../loading/loading';

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
        this.displayAddBtn = this.displayAddBtn.bind(this);
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
            this.reward.rewardMe();
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
        this.reward.rewardMe();
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

    displayAddBtn(){
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === 'development') {
            return <button type="button" className="add-interface-btn" id="add-goals-btn" style={{ visibility: 'visible' }} onClick={this.displayInterface}>Add Goals</button>;
        } else {
            console.log("Status: Production (can not add)")
        }
    }

    /**
     * Set a new array state without deleted goal
     * @param {int} indexToDelete - index of goal that w'ere going to delete 
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
        this.reward.rewardMe();
        // console.log(this.state.goals);
    }

    render() {
        return (
            <div className={styles.page}>
                <div className={styles['reward']} id="reward-container">
                    <Reward
                        ref={(ref) => { this.reward = ref }}
                        type='emoji'
                        config={{
                            zIndex: 10000,
                            spread: 180
                        }}
                    >
                        <p id="reward"></p>
                    </Reward>
                </div>
                <h1 className={styles['header']} id="goals-header">Goals</h1>
                <button type="button" className="add-interface-btn" id="add-goals-btn" style={{ visibility: 'visible' }} onClick={this.displayInterface}>Add Goals</button>
                {
                    this.state.removeInterface ? null : <GoalInterface displayGoalsFunc={this.displayGoalsFunc}/>
                }
                {
                    this.displayLoading()
                }
                <div className={styles["goals-container"]} id="goals-container">
                    {
                        this.state.goals.slice(1).map((goal) => {
                            console.log('parent state index: ' + goal.index)
                            return <GoalDisplay key={"goal-" + goal.index} afterRemovalDisplay={this.afterRemovalDisplay} content={goal.content} tagColor={goal.tagColor} index={goal.index} date={goal.date} removeDisplayLoading={this.removeDisplayLoading}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Goals;