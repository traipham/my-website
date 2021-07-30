import { render } from "@testing-library/react";
import React, { useState } from "react";
import ReactDOM from 'react-dom';
import styles from './goals.module.css';
/**
 * This file will be where I learn about Hooks and component functions. I learned how to transfer information
 * of child component to parent component using state.
 * 
 * 7/26 TODO:
 *  - Get infromation and display it/append it to the interface container
 *  - Problem with appending, it does not append due to error about Node
 */
const ContentInterface = (props) =>{

    const tagColors = ['Aquamarine', 'BlueViolet', 'Chartreuse', 'CornflowerBlue',
        'Thistle', 'SpringGreen', 'SaddleBrown', 'PapayaWhip', 'MistyRose'];
    
    // dismount interface when button is clicked
    const handleClick = () =>{
        props.setInterfaceRemove();
        document.getElementById('content-container').appendChild(props.handleOnSubmit());
    }


    function printColor(){
        console.log(document.getElementById('inp-color').value);
    }

    return(
        <div className={styles['content-interface']}>
            <label className="add-content" id={styles['add-content']}><b>Content</b></label>
            <input className="inp-content" id="inp-content" htmlFor="add-content" placeholder="content"></input>
            <br/>
            <br/>
            <label className="add-color" id={styles['add-color']}><b>Tag Color</b></label>
            <input type='color' className="inp-color" id="inp-color" htmlFor="add-color" value="#FFA500"  onChange={printColor}></input>
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
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    setInterfaceRemove(){
        this.setState(prevState => ({
            ...prevState,
            removeInterface: true
        }))
        setTimeout(() => { console.log(this.state.removeInterface)}, 100) ;
    }

    /**
     * - make a component out of what's being displayed
     * - use the new states
     */
    handleOnSubmit(){
        let container = document.createElement('div')
        container.setAttribute('className', "content-area");
        container.setAttribute('id', styles['content-area']);
        let description = document.createElement('p');
        description.innerHTML = document.getElementById('inp-content').value;
        container.appendChild(description);
        container.style['background-color'] = document.getElementById('inp-color').value;
        window.alert('Sucessfully submitted a goal!');
        return container;
        // return(
        //     <div className="content-area" id={styles['content-area']}>
        //         <p>{document.getElementById('inp-content').value}</p>
        //     </div>
        // )
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
                    this.state.removeInterface ? null : <ContentInterface setInterfaceRemove={this.setInterfaceRemove} handleOnSubmit={this.handleOnSubmit}/>
                }
                <div className="content-container" id="content-container">
                    
                </div>
                {
                    // create a new div everytime a tag color is selected
                }
            </div>
        )
    }
};

export default Goals;