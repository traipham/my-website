import React from "react";
import styles from './interest.module.css';
import PropTypes from 'prop-types';
import AddInterestInterface from './interestPostInterface';
import InterestDisplay from "./interestDisplay";
import axios from 'axios';
/**
 * Component of interest page
 */

/**
 * Functionality/Note:
 * 
 * REMOVE:
 *  - removing an element would be based on the key
 *  - when remove button is clicked, user will need to click an interest to delete
 */
class Interest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            academicInterest:[{
                interest: '',
                date: new Date(),
                id: '',
                index: 0
            }],
            personalInterest: [{
                interest: '',
                date: new Date(),
                id: '',
                index: 0
            }],
            addAcadBtn: false,
            addPersBtn: false,
            whichBtn: ''
        }

        this.setAddAcadBtn = this.setAddAcadBtn.bind(this);
        this.setAddPersBtn = this.setAddPersBtn.bind(this);
        this.displayInterestFunc = this.displayInterestFunc.bind(this);
        this.deleteAcadBtnOnClick = this.deleteAcadBtnOnClick.bind(this);
        this.deletePersBtnOnClick = this.deletePersBtnOnClick.bind(this);
        this.removeAcadInterface = this.removeAcadInterface.bind(this);
        this.persRemoveInterface = this.persRemoveInterface.bind(this);
        // this.handleOnMouseOverInterest = this.handleOnMouseOverInterest.bind(this);
        // this.handleOnMouseOutInterest = this.handleOnMouseOutInterest.bind(this);
    }

    /**
     * Get data from mongo for all interest and store in state
     */
    componentDidMount(){
        setTimeout(async ()=>{
            const arrAcadInterest = await axios.get('/interest/posts').then((res) => { return res.data[0].academicInterests });
            const arrPersInterest = await axios.get('/interest/posts').then((res) => { return res.data[0].personalInterests });

            console.log(arrAcadInterest);
            let acadCount = 1;
            arrAcadInterest.forEach((post) =>{
                // const removeBtn = document.getElementById('del-btn-'+acadCount)
                // removeBtn.addEventListener('onClick', this.deleteAcadBtnOnClick())
                this.setState({
                    ...this.state,
                    academicInterest: [...this.state.academicInterest, {
                        interest: post.interest,
                        date: post.date, 
                        id: post._id,
                        index: acadCount++
                    }]
                })
            })
            console.log(arrPersInterest);
            let persCount = 1;
            arrPersInterest.forEach((post) => {
                this.setState({
                    ...this.state,
                    personalInterest: [...this.state.personalInterest, {
                        interest: post.interest,
                        date: post.date,
                        id: post._id,
                        index: persCount++
                    }]
                })
            })
        })
        setTimeout(() => {
            console.log(this.state);
        }, 300)
    }

    /**
     * Get data from mongo and display recently added interest
     * @param {String} typeOfInterest - string of whether added interest is academic or personal
     */
    displayInterestFunc(typeOfInterest){
        setTimeout(async () => {
            if (typeOfInterest === 'Academic') {
                const arrAcadInterest = await axios.get('/interest/posts').then((res) => {return res.data[0].academicInterests})
                const post = arrAcadInterest[arrAcadInterest.length -1];
                console.log(post);
                this.setState({
                    ...this.state,
                    addAcadBtn: false,
                    academicInterest:[...this.state.academicInterest, {
                        interest: post.interest,
                        date: post.date,
                        id: post._id,
                        index: this.state.academicInterest.length
                    }]
                })
            } else if (typeOfInterest === 'Personal') {
                const arrPersInterest = await axios.get('/interest/posts').then((res) => { return res.data[0].personalInterests })
                const post = arrPersInterest[arrPersInterest.length - 1];
                console.log(post);
                this.setState({
                    ...this.state,
                    addPersBtn: false,
                    personalInterest: [...this.state.personalInterest, {
                        interest: post.interest,
                        date: post.date, 
                        id: post._id,
                        index: this.state.personalInterest.length
                    }]
                })
            }
        }, 300)
    }

    /**
     * Set state 'addAcadBtn' to true to display interface
     * @param {*} e - event object for onClick of add academic interest button
     */
    setAddAcadBtn(e){
        this.setState({
            ...this.state,
            addAcadBtn: true,
            whichBtn: e.target.id
        })
    }

    /**
     * Set state 'addPersBtn' to true to display interface
     * @param {*} e - event object for onClick of add personal interest button 
     */
    setAddPersBtn(e){
        this.setState({
            ...this.state,
            addPersBtn: true,
            whichBtn: e.target.id
        })
    }

    persRemoveInterface(){
        this.setState({
            ...this.state,
            addPersBtn: false,
        })
    }

    removeAcadInterface(){
        this.setState({
            ...this.state,
            addAcadBtn: false,
        })
    }

    /**
     * Delete academic interest and change state
     * @param {*} e - event object for onClick of delete button 
     */
    async deleteAcadBtnOnClick(e){
        if(window.confirm("Are you sure you want to delete this?")){
            const index = e.target.id.slice(8, e.target.id.length);
            console.log("index to delete: " + index);
            const idToDelete = this.state.academicInterest[index].id
            console.log(this.state.academicInterest[index].interest);

            const success = await axios.delete('/interest/delete/acad/1', { data: { _id: idToDelete } });
            console.log(success);

            if (success.status === 200) {
                const arrAcadInterest = this.state.academicInterest;
                arrAcadInterest.splice(index, 1)
                for (let i = index; i < arrAcadInterest.length; i++) {
                    arrAcadInterest[i].index -= 1;
                }
                this.setState({
                    ...this.state,
                    academicInterest: arrAcadInterest
                });
            } else {
                console.log(success.data)
            }
        }
    }

    /**
     * Delete personal interest, and change state
     * @param {*} e - event object for onClick of delete button 
     */
    async deletePersBtnOnClick(e) {
        if(window.confirm("Are you sure you want to delete this?")){
            const index = e.target.id.slice(8, e.target.id.length);
            console.log("index to delete: " + index)
            const idToDelete = this.state.personalInterest[index].id
            console.log(this.state.personalInterest)
            console.log("id to delete: " + idToDelete)
            const success = await axios.delete('/interest/delete/personal/1', { data: { _id: idToDelete } });
            console.log(success);

            if (success.status === 200) {
                const arrPersInterest = this.state.personalInterest;
                arrPersInterest.splice(index, 1);
                for (let i = index; i < arrPersInterest.length; i++) {
                    arrPersInterest[i].index -= 1;
                }
                this.setState({
                    ...this.state,
                    personalInterest: arrPersInterest
                });
            } else {
                console.log(success.data);
            }
        }
    }

    // handleOnMouseOutInterest(e){
    //     document.getElementById(`del-btn-${e.target.id.slice(14,e.target.id.length)}`).style.visibility = 'hidden';
    // }

    // handleOnMouseOverInterest(e){
    //     document.getElementById(`del-btn-${e.target.id.slice(14, e.target.id.length)}`).style.visibility = 'visible';
    //     console.log(document.getElementById(`del-btn-${e.target.id.slice(14,e.target.id.length)}`));
    // }

    render(){
        return (
            <div className={styles['interest-page']} id="interest-page">

                <h1 className={styles["header"]}>Interests</h1>
                <div className={styles['interest-container']} id="academic-int-container">
                    <h3>Academic/Career Interest</h3>
                    <div className={styles["interface-container"]} id="academic-interest-interface">
                        {
                            this.state.addAcadBtn ? <AddInterestInterface displayInterestFunc={this.displayInterestFunc} whichBtn={this.state.whichBtn} removeInterface={this.removeAcadInterface}/> : null
                        }
                    </div>
                    <button type="button" className="add-btn" id="add-academic-interest" onClick={this.setAddAcadBtn}>Add</button>
                    <div className={styles["list-container"]}>
                        <ul className="acad-list">
                            {
                                this.state.academicInterest.slice(1).map((interest) => {
                                    return (
                                        <li key={"a-li-" + interest.index} id={'acad-interest-' + interest.index}>
                                            {interest.interest} // <b>{interest.date.toString().slice(0, 10)}</b>
                                            <button type="button" className={styles["delete-btn"]} id={'del-btn-' + interest.index} onClick={this.deleteAcadBtnOnClick}>X</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className={styles["desc-container"]}>
                        <p>
                            I'm very flexible with what I want to do professionally. I want to be able to gain all types of experience.
                            I want to learn many new concepts/subjects within the field of computer science and technology. The advancement
                            of technology would be extremely beneficial for everyone, in which I wish to be a part of building the new technological
                            era. It sounds cliche, but I enjoy working with technology.
                        </p>
                    </div>
                </div>
                <div className={styles['interest-container']} id="personal-interest-container">
                    <h3>Personal Interest</h3>
                    <div className={styles["interface-container"]} id="personal-interest-interface">
                        {
                            this.state.addPersBtn ? <AddInterestInterface displayInterestFunc={this.displayInterestFunc} whichBtn={this.state.whichBtn} removeInterface={this.persRemoveInterface}/> : null
                        }
                    </div>
                    <button type="button" className="add-btn" id="add-personal-interest" onClick={this.setAddPersBtn}>Add</button>
                    <div className={styles['list-container']}>
                        <ul className="pers-list">
                            {
                                this.state.personalInterest.slice(1).map((interest) => {
                                    return (
                                        <li key={"p-li-" + interest.index} id={'pers-interest-' + interest.index}>
                                            {interest.interest} // <b>{interest.date.toString().slice(0, 10)}</b>
                                            <button type="button" className={styles["delete-btn"]} id={'del-btn-' + interest.index} onClick={this.deletePersBtnOnClick}>X</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Interest;