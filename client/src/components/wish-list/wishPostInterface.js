import React, {useState, useEffect} from 'react';
import styles from './wish-list.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * This interfacce shows up when we want to add a wish
 * - input Title
 * - input Tag
 * - input Description
 * - input Image
 * - input Rating
 * Feature?:
 *  - custom tag function? 
 * @returns 
 */
const WishPostInterface = (props) => {
    const [titleInp, setTitle] = useState('');
    const [descriptionInp, setDescription] = useState('');
    const [imgInp, setImg] = useState({ });
    const [tagInp, setTag] = useState('Personal');
    const [ratingInp, setRating] = useState(0);
    // const [indexInp, setIndex] = useState(0);

    // let fileURL = '';

    /**
     * Gives us the URL of the image 
     * @param {} e Event object of event listener of 'onChange' when selecting image
     */
    const handleOnChangeImage = (e) => {
        e.preventDefault();
        // Get image file
        const file = e.target.files[0];
        // Set image file
        setImg(file);

        // Preview image file
        const imgURL = URL.createObjectURL(e.target.files[0]);
        document.getElementById('preview-wishlist-img').src = imgURL;
    }

    /**
     * Set title 
     * @param {*} e - event object for onChange event for title input 
     */
    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    /**
     * Set description
     * @param {*} e - event object for onChange event for description input 
     */
    const handleOnChangeDesc = (e) => {
        setDescription(e.target.value);

        // Max char: 250, view remaining # of chars
        const descriptionLength = e.target.value.length;
        const remainingLength = (250 - descriptionLength);
        document.getElementById('desc-char-count').innerHTML = `Character Limit: ${remainingLength}`;

    }

    /**
     * Set tag
     * @param {*} e - event object for onChange event for tag input 
     */
    const handleOnChangeTag = (e) => {
        setTag(e.target.value);
    }

    /**
     * Set rating
     * @param {} e - event object for onChange event for rating input 
     */
    const handleOnChangeRating = (e) => {
        setRating(e.target.value);
    }
    
    /**
     * Call parent function through props and close interface
     * @param {*} e - event object for onClick event for exit button
     */
    const handleOnClickExitBtn = (e) => {
        e.preventDefault();

        props.closeInterface();
    }

    /**
     * This will call the parent function to change value of parent state based on inputted information
     * @param {*} e Event object of the event listener that is calling this function
     */
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append('title', titleInp);
        fd.append('tag', tagInp);
        fd.append('description', descriptionInp);
        fd.append('image', imgInp);
        fd.append('rating', ratingInp);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const success = await axios.post('/wish-list/addWish', fd, config);
        
        console.log(success);
        // If successful send to wish page
        if (success.status === 200) {
            props.displayWishFunc()
            // else print error msg
        } else {
            console.log(success.data);
        }
    }

    return (
        <div className={styles["interface-container"]} id="wish-interface-container">
            <button type="button" className="btn" id={styles['exit-btn']} onClick={handleOnClickExitBtn}>X</button>
            <h2 className="add-a-wish" id={styles["wish-header"]}>Add a Wish</h2>
            <form onSubmit={handleSubmitForm} className={styles["form-container"]} id="wish-form-container">
                {
                    /**
                     * Title
                     */
                }
                <div className={styles["input-container"]} id={styles["wish-title-container"]}>
                    <label className="title" id="wish-int-title" htmlFor="input-wish-title"><b>Title: </b></label>
                    <input type="text" className="input-title" id="input-wish-title" placeholder="I wish for..." onChange={handleOnChangeTitle} ></input>
                </div>
                {
                    /**
                     * Tag
                     */
                }
                <div className={styles["input-container"]} id={styles["wish-tag-container"]}>
                    <label className="tag" id="wish-int-tag" htmlFor="input-wish-tag"><b>Tag: </b></label>
                    <select name="input-wish-tag" id="input-wish-tag" onChange={handleOnChangeTag} defaultValue="Personal">
                        <option value="Personal">Personal</option>
                        <option value="Familial">Familial</option>
                        <option value="Random">Random</option>
                        <option value="Custom">Custom</option>
                    </select>
                </div>
                {
                    /**
                     * Description
                     */
                }
                <div className={styles["input-container"]} id="wish-desc-container">
                    <label className="description" id="wish-int-description" htmlFor="input-wish-description"><b>Description: </b></label>
                    <textarea className="input-description" id="input-wish-description" placeholder="Describe wish..." rows="4" cols="50" maxLength="250" onChange={handleOnChangeDesc}></textarea>
                    <p className="counter" id="desc-char-count">Character Limit: 250</p>
                </div>
                {
                    /**
                     * Image
                     */
                }
                <div className={styles["input-container"]} id="wish-img-container">
                    <label className="image" id="wish-int-img" htmlFor="input-wish-img"><b>Select image: </b></label>
                    <input type="file" name="image" id="input-wish-img" name="input-wish-img" accept="image/*" onChange={handleOnChangeImage}></input>
                    <img className='post-img' id='preview-wishlist-img' src="#" alt="preview image" height="200px" width="200px" />
                </div>
                {
                    /**
                     * Rating
                     */
                }
                <div className={styles["input-container"]} id="wish-rating-contaienr">
                    <label className="rating" id="wish-int-rating" htmlFor="input-wish-rating"><b>Rating(0-10): </b></label>
                    <input type="number" id="input-wish-rating" name="input-wish-rating" min="0" max="10" placeholder="0" onChange={handleOnChangeRating}></input>
                </div>

                <button type='submit' id={styles["submit-btn"]} value="Submit" >Submit</button>
                <button type="reset" id={styles["reset-btn"]} value="Reset">Reset</button>
            </form>
        </div>
    )
}
//Using PropTypes to make sure props functions are there
WishPostInterface.propTypes = {
    displayWishFunc: PropTypes.func.isRequired
}

export default WishPostInterface;