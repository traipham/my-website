import React from 'react';
import styles from './blog.module.css';

export const BlogPostInterface = (props) => {

    let imgUrl = '';

    const handleSelectImage = (e) =>{
        e.preventDefault();
        const imgFile = URL.createObjectURL(e.target.files[0]);
        imgUrl = imgFile;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        props.displayBlogPostFunc(imgUrl);
    }

    return (
        <div className="container" id={styles["post-interface-container"]}>
            <h4 id={styles["header"]}><b>Create a Post</b></h4>
            <form id={styles["post-interface-form"]} onSubmit={handleSubmit}>
                <div className={styles['input-container']}>
                    <label id="label-img" htmlFor="input-img"><b>Select Image:</b></label>
                    <br/>
                    <input type="file" id="input-img" name="img" accept="image/*" onChange={handleSelectImage}></input>
                </div>

                <div className={styles['input-container']}>
                    <label id="label-content" htmlFor="input-content"><b>Describe your Day: </b></label>
                    <br/>
                    <input type="text" id="input-content" name="content"></input>
                </div>

                <div className={styles['input-container']}>
                    <label id="label-location" htmlFor="input-location"><b>Location: </b></label>
                    <br/>
                    <input type="text" id="input-location" name="location"></input>
                </div>

                <div className={styles['input-container']}>
                    <button type="submit" className="submit-btn" id="submit-post">Submit</button>
                    <button type="reset" className="reset-btn" id="reset-post">Reset</button>
                </div>
            </form>
        </div>
    )
}