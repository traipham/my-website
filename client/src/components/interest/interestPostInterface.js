import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './interest.module.css';

/**
 * Add Interest Interface child Component
 */
class AddInterestInterface extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            typeOfInterest: '',
            interest: 'interest'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnChangeInterest = this.handleOnChangeInterest.bind(this);
    }

    componentDidMount() {
        if (this.props.whichBtn === 'add-academic-interest') {
            const academic = 'Academic';
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

    /**
     * Set interest state
     * @param {*} e - event object of onChange event for interest inpute 
     */
    handleOnChangeInterest(e){
        this.setState({
            ...this.state,
            interest: e.target.value
        })
    }

    /**
     * Submit new interest in correct list
     * @param {*} e - event object of onSubmit event for form submission 
     */
    handleSubmit = async (e) => {
        e.preventDefault();

        // Get interest
        let interestPost = {
            interest: this.state.interest
        };

        // Add interest to database of correct section
        let success = {};
        if(this.state.typeOfInterest === 'Academic') {
            success = await axios.post('/interest/addAcadInterest', interestPost)
        } else if (this.state.typeOfInterest === 'Personal') {
            success = await axios.post('/interest/addPersonalInterest', interestPost)
        }
        console.log(success);

        // If successful, send data back to parent component
        if(success.status === 200){
            this.props.displayInterestFunc(this.state.typeOfInterest);
            // Else print error
        } else {
            console.log(success.data);
        }
    }

    render() {
        return (
            <div className={styles.addInterface}>
                <div className="container">
                    <h4>Add a new {this.state.typeOfInterest} Interest</h4>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <label className="label" id="label-interest" htmlFor="input-interest"><b>Interest: </b></label>
                        <input className="inpt-cnt" id="input-interest" placeholder="add interest..." onChange={this.handleOnChangeInterest}></input>
                        <br />
                        <button type="submit" className="submit-btn" id={styles['interest-submit-btn']}><b>Submit</b></button>
                    </form>
                </div>
            </div>
        )
    }
}
AddInterestInterface.propTypes = {
    whichBtn: PropTypes.string.isRequired
}

export default AddInterestInterface;