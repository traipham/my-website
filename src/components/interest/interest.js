import React from "react";
import reactDom from "react-dom";
import ReactDOM from "react-dom";
import styles from './interest.module.css';
import PropTypes from 'prop-types';
/**
 * Name of Component: Interest
 * 
 * Description: This component is a page of the website. Contains my academic interest and personal interest.
 * I will be able to ADD new interest or remove interest. (Academic or Personal)
 * 
 */

/**
 * Add Interest Interface  
 */
class AddInterestInterface extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            typeOfInterest: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.whichBtn == 'add-academic-interest'){
            const academic= 'Academic';
            this.setState({
                typeOfInterest: academic
            })
        } else {
            const personal = "Personal";
            this.setState({
                typeOfInterest: personal
            })
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.displayInterestFunc();
    }

    render() {
        const submitBtnStyle = {
            margin: 10
        }
        return (
            <div className={styles.addInterface}>
                <div className="container">
                    <h4>Add a new {this.state.typeOfInterest} Interest</h4>
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <label className="label" id="label-interest" htmlFor="input-interest"><b>Interest: </b></label>
                        <input className="inpt-cnt" id="input-interest" placeholder="add interest..."></input>
                        <br/>
                        <button type="submit" className="submit-btn" id="submit-btn" style={submitBtnStyle}><b>Submit</b></button>
                    </form>
                </div>
            </div>
        )
    }
}
AddInterestInterface.propTypes = {
    typeOfInterest: PropTypes.func.isRequired
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

        this.state = {
            academicInterest:[{
                interest: '',
                date: new Date()
            }],
            personalInterest: [{
                interest: '',
                date: new Date()
            }],
            addBtn: false,
            whichBtn: ''
        }

        this.setAddBtn = this.setAddBtn.bind(this);
        this.displayInterestFunc = this.displayInterestFunc.bind(this);
    }

    displayInterestFunc(){
        const interest = document.getElementById('input-interest').value;

        if (this.state.whichBtn == 'add-academic-interest') {
            this.setState({
                ...this.state,
                academicInterest: [...this.state.academicInterest, {
                    interest: interest,
                    date: new Date()
                }],
                addBtn: false
            })
        } else if (this.state.whichBtn == 'add-personal-interest') {
            this.setState({
                ...this.state,
                personalInterest: [...this.state.personalInterest, {
                    interest: interest,
                    date: new Date()
                }],
                addBtn: false
            })
        }

    }

    setAddBtn(e){
        this.setState({
            ...this.state,
            addBtn: true,
            whichBtn: e.target.id
        })
        setTimeout(() =>console.log(this.state.whichBtn), 1000);
    }

    render(){
        let academicIndex =6;
        let personalIndex=9;
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
                        {
                            this.state.academicInterest.slice(1).map((interest)=>{
                                academicIndex++;
                                return <li key={"a-li-"+academicIndex}>{interest.interest} {interest.date.toString().slice(0,16)}</li>
                            })
                        }
                    </ul>
                    <div className="container" id="personal-interest-interface">
                        {
                            this.state.addBtn ? <AddInterestInterface displayInterestFunc={this.displayInterestFunc} whichBtn={this.state.whichBtn}/> : null
                        }
                    </div>
                    <button type="button" className="add-btn" id="add-academic-interest" onClick={this.setAddBtn}>Add</button>
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
                        {
                            this.state.personalInterest.slice(1).map((interest) => {
                                personalIndex++;
                                return <li key={"a-li-" + personalIndex}>{interest.interest} {interest.date.toString().slice(0, 16)}</li>
                            })
                        }
                    </ul>
                    <button type="button" className="add-btn" id="add-personal-interest" onClick={this.setAddBtn}>Add</button>
                    <button type="button" className="remove-btn">Remove</button>
                </div>
            </div>
        )
    }
}

export default Interest;