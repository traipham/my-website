import React from "react";
import reactDom from "react-dom";
import ReactDOM from "react-dom";
import styles from './interest.module.css';
/**
 * Name of Component: Interest
 * 
 * Description: This component is a page of the website. Contains my academic interest and personal interest.
 * I will be able to ADD new interest or remove interest. (Academic or Personal)
 * 
 */


/**
 * 
 * @returns a string of the date 'YYYY-MM-DD'
 */
function getCurrDate(){
    let currDate = new Date();
    console.log("Current Date: " + currDate.toISOString().split('T')[0])
    return currDate.toISOString().split('T')[0];
}
/**
 * Add Interest Interface  
 */
class AddPersonalInterest extends React.Component {

    render() {
        return (
            <div className={styles.addInterface}>
                <div className="container">
                    <h4>Add a new Personal Interest</h4>
                    <form>
                        <label className="content" id="content">Content</label>
                        <input className="inpt-cnt" htmlFor="content" placeholder="add-content"></input>
                        <button className="confirm-btn" id="confirm-btn" type="button">Confirm</button>
                    </form>
                </div>
            </div>
        )
    }
}


/**
 * Functionality/Note:
 * 
 * ADD: 
 *  when adding new interest, add new key to the li tag
 * 
 * REMOVE:
 *  removing an element would be based on the key
 *  when remove button is clicked, user will need to click an interest to delete
 */
class Interest extends React.Component {
    constructor(props) {
        super(props);

        this.addInterestInterface = this.addInterestInterface.bind(this);
    }


    addInterestInterface() {
        ReactDOM.render(<AddPersonalInterest />, document.querySelector('.add-interest-interface'));
    }

    render(){
        return (
            <div className={styles.page} id="interest-page">
                <h1 className="title">Interests</h1>
                <p>This will contain a list of my interest</p>
                <div className={styles['interest-container']} id="academic-int-container">
                    <h3>Academic/Career Interest</h3>
                    <ul className="acad-list">
                        <li key="a-li-1">Programming 07/10/2021</li>
                        <li key="a-li-2">Software Engineering</li>
                        <li key="a-li-3">IT</li>
                        <li key="a-li-4">Game Development</li>
                        <li key="a-li-5">Software/App Development</li>
                        <li key="a-li-6">Project Management</li>
                    </ul>
                    <button type="button" className="add-btn" onClick={this.addInterestInterface}>Add</button>
                    <div className='add-interest-interface' id={styles['add-interest-interface']}>

                    </div>
                    <button type="button" className="remove-btn">Remove</button>
                    <p>
                        I'm very flexible with what I want to do professionally. I want to be able to gain all types of experience.
                        I want to learn many new concepts/subjects within the field of computer science and technology. The advancement
                        of technology would be extremely beneficial for everyone, in which I wish to be a part of building the new technological
                        era. It sounds cliche, but I enjoy working with technology.
                    </p>
                </div>
                <div id="personal-interest-container">
                    <h3>Personal Interest</h3>
                    <ul className="pers-list">
                        <li key="p-li-1">Wood Working</li>
                        <li key="p-li-2">Handy Man</li>
                        <li key="p-li-3">Mechnical Engineering</li>
                        <li key="p-li-4">Animating</li>
                        <li key="p-li-5">Gym</li>
                        <li key="p-li-6">Health</li>
                        <li key="p-li-7">Anime</li>
                        <li key="p-li-8">Games</li>
                        <li key="p-li-9">Exploring/Sight-seeing</li>
                    </ul>
                    <button type="button" className="add-btn">Add</button>
                    <button type="button" className="remove-btn">Remove</button>
                </div>
            </div>
        )
    }
}

export default Interest;