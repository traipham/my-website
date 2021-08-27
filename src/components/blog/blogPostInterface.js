import React, {useState} from 'react';
import styles from './blog.module.css';
import axios from 'axios';

/**
 * Input form component
 *  TODO: Reset btn functionality
 * @param {*} props - contains the displayBlogPostFunc that'll 
 *                      help connect parent component to this child component
 * @returns 
 */
export const BlogPostInterface = (props) => {
    // Storing input in states
    const [contentInp, setContent] = useState('');
    const [locationInp, setLocation] = useState('');
    const [imageInp, setImage] = useState('');

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
        setImage(file);

        // Create URL for img to preview
        const imgUrl = URL.createObjectURL(e.target.files[0]);
        
        // Preview img
        document.getElementById("blog-img").src = imgUrl;

    }

    /**
     * Set state content to content input
     * @param {*} e - event object of onChange event for content input 
     */
    const onChangeContent = (e) =>{
        setContent(e.target.value);
    }

    /**
     * Set state of location to input location
     * @param {*} e - event object of onChange event for Location input
     */
    const onChangeLocation = (e) =>{
        setLocation(e.target.value);
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
        const success = await axios.post('http://localhost:5000/blog/addPost', fd, config)

        if (success.status === 200){
            props.displayBlogPostFunc();
        } else {
            console.log('Failed to add to database!');
        }
    }

    return (
        <div className="container" id={styles["post-interface-container"]}>
            <h4 id={styles["header"]}><b>Create a Post</b></h4>
            <form method="POST" id={styles["post-interface-form"]} onSubmit={handleSubmit} encType="multipart/form-data">
                {/**
                 * Input Image
                 */}
                <div className={styles['input-container']}>
                    <label id="label-img" htmlFor="input-img"><b>Select Image (not required) :</b></label>
                    <br/>
                    <input type="file" id="input-img" name="image" accept="image/*" onChange={handleSelectImage}></input>
                    <img className="img" id="blog-img" src="#" alt="preview image" height="250px" width="250px"></img>
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