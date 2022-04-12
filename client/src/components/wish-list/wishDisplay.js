import React, {useState} from 'react';
import styles from './wishDisplay.module.css'
import PropTypes from 'prop-types';
import axios from 'axios';

/**
 * Each wish is its own component
 *  - displays inputted information from interface 
 * @param {*} props 
 * @returns 
 */
const WishDisplay = (props) => {
    // console.log("This is the idea of this Wish: " + props.index);

    const [inpClick, setInpClick] = useState(false);

    /**
     * Make button visible when hovering over post
     * @param {*} e - event object for onMouseOver of post container
    */
    const handleMouseOver = (e) => {
        document.getElementById("remove-wish-" + props.index).style.display = 'inline-block';
        document.getElementById("remove-wish-" + props.index).style.visibility = 'visible';
        setTimeout(() => {
            document.getElementById("remove-wish-" + props.index).style.transform = 'scale(1,1)';
        }, 100)
    }

    /**
     * Make button hidden when moving out of post
     * @param {*} e - event object for onMouseOut of post container
    */
    const handleMouseOut = (e) => {
        document.getElementById("remove-wish-" + props.index).style.display = 'none';
        document.getElementById("remove-wish-" + props.index).style.visibility = 'hidden';
        setTimeout(() => {
            document.getElementById("remove-wish-" + props.index).style.transform = 'scale(0,0)';
        }, 100)
    }

    /**
     * Flip to back side of post where you can update 
     * @param {*} e 
     */
    const clickToUpdate = (e) => {
        let divTag = e.target.tagName.toLowerCase();

        console.log("tag:" + divTag);
        // Does not flip if clicking button
        if (divTag != "b") {
            document.getElementById("wish-display-" + props.index).style.transform = "scale(0)";
            document.getElementById('wish-container-' + props.index).style.transform = "scale(0)"
            setTimeout(() => {
                document.getElementById("wish-display-" + props.index).style.display = "none";
                document.getElementById("wish-update-" + props.index).style.display = "flex";
                setTimeout(() => {
                    document.getElementById('wish-container-' + props.index).style.transform = "scale(1)"
                    document.getElementById("wish-update-" + props.index).style.transform = "scale(1)";
                }, 100)
            }, 500)
        }
    }

    /**
     * Go back to original wish post
     * @param {*} e 
     */
    const clickToGoBack = (e) => {
        // get tag 
        let tag = e.target.tagName.toLowerCase()
        // console.log(tag);
        // flip back only if user click on empty space of div
        if(tag == "form")
        {
            setInpClick(false);
            document.getElementById("wish-update-" + props.index).style.transform = "scale(0)";
            document.getElementById('wish-container-' + props.index).style.transform = "scale(0)"
            setTimeout(() => {
                document.getElementById("wish-update-" + props.index).style.display = "none";
                document.getElementById("wish-display-" + props.index).style.display = "inline-block";
                setTimeout(() => {
                    document.getElementById('wish-container-' + props.index).style.transform = "scale(1)"
                    document.getElementById("wish-display-" + props.index).style.transform = "scale(1)";
                }, 100);
            }, 400);
        }
    }

    const onClickInput = (e) => 
    {
        setInpClick(true);
    }

    /**
     * Remove wish at index
     * @param {*} e - event object for onClick event of remove button
     */
    const removeWishOnClickBtn = async (e) => {
        if(props.isAdmin){
            console.log("I AM ADMIN!");
            if (window.confirm('Are you sure you want to delete this post?')) {
                props.displayLoading();
                const indexToDelete = props.index - 1;
                const success = await axios.delete('/wish-list/delete/1', { data: { index: indexToDelete } });
                // Log result msg
                console.log(success.data)
                if (success.status === 200) {
                    props.removeWish(indexToDelete + 1);
                }
            } else {
                console.log('Do not remove post!');
            }
        } else {
            alert("Not an Admin!");
        }
    }

    /**
     * Display image if user input image
     * @returns img jsx element
     */
    const imageExist = () => {
        if (props.img === undefined) {
            // document.getElementById('wish-container').style.flex = '';
            console.log('No image exist for wish #: ' + props.index);
            return
        } else {
            let imgB64 = Buffer.from(props.img.data).toString('base64');
            return <img src={`data:image/jpeg;base64,${imgB64}`} className={styles["img"]} id="wish-img" width="200px" height="200px" />;
        }
    }

    return (
        <div className={styles['display-container']} id={'wish-container-' + props.index} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <div className={styles["display-content"]} id={"wish-display-" + props.index} onClick={clickToUpdate}>
                <button type="button" className={styles["remove-btn"]} id={"remove-wish-" + props.index} onClick={removeWishOnClickBtn}><b>Remove this Wish</b></button>
                <p className="index" id={styles["wish-num"]}><b>Wish #: </b><i>{props.index}</i></p>
                <p className="date" id="wish-date"><b>Date: </b>{props.date.toString().slice(0, 10)}</p>
                <div className="header-grp" id={styles['title-tag-container']}>
                    <h3 className="title" id={styles['wish-title']}>{props.title}</h3>
                    <p className="tag" id="wish-tag">Tag: <i>{props.tag}</i></p>
                </div>
                {
                    imageExist()
                }
                <p className="description" id="wish-description">{props.description}</p>
                <p><b>Rating:</b> {props.rating}</p>
            </div>
            <form className={styles["update-container"]} id={"wish-update-"+props.index} onClick={clickToGoBack}>
                <label for="update-title">Title: </label>
                <input className="update-inp-title" id="update-title" placeholder="Update title"></input>
                <label for="update-description">Description: </label>
                <textarea className="update-inp-desc" id="update-description" onClick={onClickInput} placeHolder="Update description" rows="10" cols="50"></textarea>
                {
                    !inpClick ? <p>Hello world</p> : null
                }
                <label for="update-tag">Tag: </label>
                <input className="update-inp-tag" id="update-tag" placeHolder="Update tag"></input>
                <label for="update-rating">Rating: </label>
                <input className="update-inp-rating" id="update-rating" placeHolder="Update rating"></input>
                <button type="submit" className="update-btn" id="update-wish-btn">Update</button>
            </form>
        </div>
    )
}

//Using PropTypes to make sure props are being delivered with correct data type and requirement
WishDisplay.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    img: PropTypes.object,
    description: PropTypes.string,
    rating: PropTypes.number
}

export default WishDisplay;