import { render } from "@testing-library/react";
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import styles from './goals.module.css';

export const GoalDisplay = (props) => {
    let textColor = 'black';
    if(parseInt(props.tagColor.slice(1,3), 16) < 100){
        textColor= 'white'
    }
    const styleContainer = {
        color: textColor,
        overflowWrap: 'break-word',
        border: "2px solid black",
        borderRadius: "5px",
        width: "fit-content",
        maxWidth: '200px',
        padding: "10px",
        backgroundColor: props.tagColor,
        margin: '10px'
    }

    const styleIndex = {
        float: 'left',
        border: "1px solid " + textColor,
        borderRadius: "5px",
        width: 'fit-content',
        padding: '5px',
        marginRight: '10px'
    }
    return(
        <div className='container' id={"goal-container" + props.index} style={styleContainer}>
            <h4 id="index" style={styleIndex}>{props.index}</h4>
            <h3 id="date" styke={{display: 'inline'}}>{props.date.toString().slice(0, 16)}</h3>
            <hr/>
            <p id="content">{props.content}</p>
        </div>
    )
}

/**
 * This file will be where I learn about Hooks and component functions. I learned how to transfer information
 * of child component to parent component using state.
 * 
 * 7/26 TODO:
 *  - Get infromation and display it/append it to the interface container
 *  - Problem with appending, it does not append due to error about Node
 */
export const ContentInterface = (props) =>{

    
    // dismount interface when button is clicked
    const handleClick = () =>{
        props.setInterfaceRemove();
        props.displayGoalsFunc();
    }


    function printColor(){
        console.log(document.getElementById('inp-color').value);
        console.log(document.getElementById('inp-color').value.slice(1,3));
        console.log(parseInt(document.getElementById('inp-color').value.slice(1, 3), 16))
    }

    return(
        <div className={styles['content-interface']}>
            <label className="add-content" id={styles['add-content']}><b>Content</b></label>
            <input className="inp-content" id="inp-content" htmlFor="add-content" placeholder="content"></input>
            <br/>
            <br/>
            <label className="add-color" id={styles['add-color']}><b>Tag Color</b></label>
            <input type='color' className="inp-color" id="inp-color" htmlFor="add-color" onChange={printColor}></input>
            <br />
            <br />
            <button className={styles['confirm-btn']} id="conf-btn" onClick={handleClick} >Confirm Change</button>
        </div>
    );
}
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
            removeInterface: true
        }

        this.displayInterface = this.displayInterface.bind(this);
        this.setInterfaceRemove = this.setInterfaceRemove.bind(this);
        this.displayGoalsFunc = this.displayGoalsFunc.bind(this);
    }

    setInterfaceRemove(){
        this.setState(prevState => ({
            ...prevState,
            removeInterface: true
        }))
        setTimeout(() => { console.log(this.state.removeInterface)}, 100) ;
    }

    displayGoalsFunc(){
        const contentVal = document.getElementById('inp-content').value;
        const color = document.getElementById('inp-color').value;

        this.setState({
            removeInterface: true,
            goals:[...this.state.goals,{
                content: contentVal,
                tagColor: color,
                date: new Date(),
                index: this.state.goals.length
            }]
        })
    }

    displayInterface(){
        this.setState({
            removeInterface: false
        })
    }

    render() {
        return (
            <div className={styles.page}>
                <h1>Goals</h1>
                <button type="button" className="add-interface-btn" id="add-goals-btn" onClick={this.displayInterface}>Add Goals</button>
                {
                    this.state.removeInterface ? null : <ContentInterface setInterfaceRemove={this.setInterfaceRemove} displayGoalsFunc={this.displayGoalsFunc}/>
                }
                <div className={styles["goals-container"]} id="goals-container">
                    {
                        this.state.goals.slice(1).map((goal) => {
                            console.log(goal);
                            return <GoalDisplay key={"goal-" + goal.index} content={goal.content} tagColor={goal.tagColor} index={goal.index} date={goal.date}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Goals;