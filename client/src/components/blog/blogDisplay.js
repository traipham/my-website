import React from 'react';
import styles from './blogDisplay.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * This is the component that is beng displyed based on inputs
 * @param {*} props - contains parent's state to display info
 * @returns 
 */
const DisplayBlogPost = (props) => {

    const dateStyle = {
        border: '2px solid black',
        padding: 5,
        width: 'fit-content',
    }

    let btnStyle = {
        display: "inline-block",
        backgroundColor: 'red',
        visibility: 'hidden',
        width: "fit-content",
        height: "fit-content",
    }

    /**
     * Remove functionality 
     * @params
     * @returns
     */
    async function handleRemoveBtn() {
        props.removeDisplayLoading();
        // Get index of post
        const indexToDelete = props.index - 1;

        // Delete post at index
        const success = await axios.delete('/blog/delete/1', { data: { index: indexToDelete } });

        // Reload page when deleted successfully
        if (success.status === 200) {
            window.location.reload();
        } else {
            console.log(success.data);
        }
    }

    /**
     * Display image if image was inputted
     * @returns jsx img element if image exists
     */
    function imageExist() {
        // If there isn't an image
        if (props.image === undefined) {
            return
            // else return jsx img element 
        } else {
            let imgB64 = Buffer.from(props.image.data).toString('base64')
            return <img className={styles["post-img"]} src={`data:image/jpeg;base64,${imgB64}`} id="post-image" width="200px" height="200px" />;
        }
    }
    /**
     * Display remove button when hovered over post
     */
    function containerOnHover() {
        document.getElementById(`blog-btn-${props.index}`).style.visibility = 'visible';
    }

    /**
     * Hide remove button when not hovered over post
     */
    function containerMouseOut() {
        document.getElementById(`blog-btn-${props.index}`).style.visibility = 'hidden';
    }

    return (
        <div className={styles["post-container"]} id="post-container" onMouseOver={containerOnHover} onMouseOut={containerMouseOut}>
            <div className={styles["post"]}>
                <button type="button" className="btn" id={"blog-btn-" + props.index} onClick={handleRemoveBtn} style={btnStyle}>Remove</button>
                <div className={styles['arrow-pointer']} >
                    <h4 className={styles['post-index']} id="index">{props.index}</h4>
                </div>
                <h3 className={styles['post-date']} id="date" >{props.date.toString().slice(0, 10)}</h3>
                <div className={styles['img-container']} id={'post-img-container-' + props.index}>
                    {
                        imageExist()
                    }
                </div>
                {/* <img src={`data:image/jpeg;base64,${imgB64}`} id="post-image" width="200px" height="200px"/> */}
                <br />
                <p className={styles['post-content']} id="content">"{props.content}"</p>
                <hr className={styles['post-divider']} />
                <p className={styles['post-location']} id="location"><b>Location: </b><i>{props.location}</i></p>
            </div>
        </div>
    )
}

/**
 * Type checking for props of DisplayBlogPost Component
 */
DisplayBlogPost.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.object,
    content: PropTypes.string,
    location: PropTypes.string
}

export default DisplayBlogPost;
