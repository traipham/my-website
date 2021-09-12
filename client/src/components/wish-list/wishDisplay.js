import React from 'react';
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
     * Remove wish at index
     * @param {*} e - event object for onClick event of remove button
     */
    const removeWishOnClickBtn = async (e) => {
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
            console.log('Do not remove post!')
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
        <div className={styles['display-container']} id={styles['wish-container-' + props.index]} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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