import React, {useState} from 'react';
import styles from './blog.module.css';
import axios from 'axios';

export const BlogPostInterface = (props) => {

    const [contentInp, setContent] = useState('');
    const [locationInp, setLocation] = useState('');
    const [imageInp, setImage] = useState('');
    const [indexInp, setIndex] = useState(props.index-1);
    // const [date, setDate] = useState(new Date());
    

    let imgUrl = '';

    const handleSelectImage = (e) =>{
        e.preventDefault();

        const file = e.target.files[0];

        console.log(e.target.files[0])
        setImage(file);

        const imgUrl = URL.createObjectURL(e.target.files[0]);
        // Set preview image
        document.getElementById("blog-img").src = imgUrl;

    }

    const onChangeContent = (e) =>{
        setContent(e.target.value);
    }

    const onChangeLocation = (e) =>{
        setLocation(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(props.index-1 < 0){
            setIndex(0);
        }
        
        let fd = new FormData();
        fd.append('image', imageInp);
        fd.append('content', contentInp);
        fd.append('location', locationInp);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        // const post = {
        //     content: contentInp,
        //     location: locationInp,
        //     image: fd,
        // }
        // console.log(post.image);

        const success = await axios.post('http://localhost:5000/blog/addPost', fd, config)

        if (success.status === 200){
            props.displayBlogPostFunc(fd);
        } else {
            console.log('Failed to add to database!');
        }
        // window.location.reload();
    }

    return (
        <div className="container" id={styles["post-interface-container"]}>
            <h4 id={styles["header"]}><b>Create a Post</b></h4>
            <form method="POST" id={styles["post-interface-form"]} onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={styles['input-container']}>
                    <label id="label-img" htmlFor="input-img"><b>Select Image:</b></label>
                    <br/>
                    <input type="file" id="input-img" name="image" accept="image/*" onChange={handleSelectImage}></input>
                    <img className="img" id="blog-img" src="#" alt="preview image" height="250px" width="250px"></img>
                </div>

                <div className={styles['input-container']}>
                    <label id="label-content" htmlFor="input-content"><b>Describe your Day: </b></label>
                    <br/>
                    <input type="text" id="input-content" name="content" onChange={onChangeContent}></input>
                </div>

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