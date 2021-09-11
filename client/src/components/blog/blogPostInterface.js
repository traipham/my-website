import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './blogPostInterface.module.css';
import axios from 'axios';

/**
 * Input form component
 *  TODO: Reset btn functionality
 * @param {*} props - contains the displayBlogPostFunc that'll 
 *                      help connect parent component to this child component
 * @returns 
 */
const BlogPostInterface = (props) => {
    // Storing input in states
    const [contentInp, setContentInp] = useState('');
    const [locationInp, setLocationInp] = useState('');
    const [imageInp, setImageInp] = useState('');

    /**
     * Set image for image state and set preview image
     * @param {*} e - object that contains the event of onChange for input
     */
    const handleSelectImage = (e) =>{
        e.preventDefault();
        // Get img file
        const file = e.target.files[0];
        console.log(e.target.files[0])

        // Store img file to state
        setImageInp(file);

        // Create URL for img to preview
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        
        // Preview img
        document.getElementById("blog-img").src = imgUrl;

    }

    /**
     * Set state content to content input
     * @param {*} e - event object of onChange event for content input 
     */
    const onChangeContent = (e) => {
        setContentInp(e.target.value);
    }

    /**
     * Set state of location to input location
     * @param {*} e - event object of onChange event for Location input
     */
    const onChangeLocation = (e) => {
        setLocationInp(e.target.value);
    }

    /**
     * calls function from parent component to remove interface
     * @param {*} e - event object for onClick event for remove button 
     */
    const handleOnClickRemoveBtn = (e) => {
        e.preventDefault();

        props.removeInterface();
    }

    /**
     * Submiting form, add blog post route, connect back to parent component
     * @param {*} e - event object of onSubmit event 
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create formdata to make upload image readable by server as 'image' fieldname for multer
        // Add other input values 
        let fd = new FormData();
        fd.append('image', imageInp);
        fd.append('content', contentInp);
        fd.append('location', locationInp);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // Route to add blog post
        const success = await axios.post('/blog/addPost', fd, config)
        
        console.log(success);
        if (success.status === 200){
            props.displayBlogPostFunc();
        } else {
            console.log('Failed to add to database!');
        }
    }

    return (
        <div className="container" id={styles["post-interface-container"]}>
            <button className={styles['remove-btn']} id='remove-interface' onClick={handleOnClickRemoveBtn}>X</button>
            <div id={styles["header-container"]}>
                <h4 id={styles["header"]}><b>Create a Post</b></h4>
            </div>
            <form method="POST" id={styles["post-interface-form"]} onSubmit={handleSubmit} encType="multipart/form-data">
                {/**
                 * Input Image
                 */}
                <div className={styles['input-container']}>
                    <label id="label-img" htmlFor="input-img"><b>Select Image (not required) :</b></label>
                    <br/>
                    <input type="file" id="input-img" name="image" accept="image/*" onChange={handleSelectImage}></input>
                    <img className="post-img" id="blog-img" src="#" alt="preview image" height="200px" width="200px"></img>
                </div>

                {/**
                 * Input Content
                 */}
                <div className={styles['input-container']}>
                    <label id="label-content" htmlFor="input-content"><b>Describe your Day: </b></label>
                    <br/>
                    <input type="text" id="input-content" name="content" onChange={onChangeContent}></input>
                </div>

                {/**
                 * Input Location
                 */}
                <div className={styles['input-container']}>
                    <label id="label-location" htmlFor="input-location"><b>Location: </b></label>
                    <br/>
                    <input type="text" id="input-location" name="location" onChange={onChangeLocation}></input>
                </div>

                <div className={styles['input-container']}>
                    <button type="submit" className="submit-btn" id="submit-post">Submit</button>
                    <button type="reset" className="reset-btn" id="reset-post">Reset</button>
                </div>
            </form>
        </div>
    )
}
// Checking Prop type
BlogPostInterface.propTypes = {
    displayBlogPostFunc: PropTypes.func.isRequired
}

export default BlogPostInterface;