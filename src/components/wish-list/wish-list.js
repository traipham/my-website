import React, {useState, useEffect} from "react";
import styles from './wish-list.module.css';
import defaultImg from './shield-hero-chibi.jpg'
/**
 * Each wish is its own component
 *  - need to know how to upload image and display it 
 * @param {*} props 
 * @returns 
 */
export const WishDisplay= (props) => {
    const [wishTitle, setWishTitle] = useState('Default title');
    const [wishDescription, setWishDescription] = useState('Default description about something');
    const [wishImg, setWishImg] = useState(defaultImg);
    const [wishRating, setWishRating] = useState(10);
    const [wishTag, setWishTag] = useState('Personal');
    const [wishDate, setWishDate] = useState(new Date());

    return(
        <div className="container" id={styles['wish-container']}>
            <button type="button" className="remove-btn" id="remove-wish">Remove this Wish</button>
            <p className="date" id="wish-date"><b>Date: </b>{wishDate.toString().slice(0, 16)}</p>
            <div className="header-grp" id={styles['title-tag-container']}>
                <h3 className="title" id={styles['wish-title']}>{wishTitle}</h3>
                <p className="tag" id="wish-tag">Tag: <i>{wishTag}</i></p>
            </div>
            <img src={wishImg} className="component-img" id="wish-img" width="200px" height="200px"/>
            <p className="description" id="wish-description">{wishDescription}</p>
            <p><b>Rating:</b> {wishRating}</p>
        </div>
    )
}

/**
 * This interfacce shows up when we want to add a wish
 * @returns 
 */
export const WishInterface = (props) => {
    return(
        <div className={styles["interface-container"]} id="wish-interface-container">
            <h2 className="add-a-wish" id={styles["add-a-wish"]}>Add a Wish</h2>
            <label className="title" id="wish-int-title" htmlFor="input-wish-title">Title: </label>
            <input type="text" className="input-title" id="input-wish-title" placeholder="I wish for..."></input>
        </div> 
    )
}
class WishList extends React.Component {
    render(){
        return (
            <div className={styles.page}>
                <h1>My Wishes</h1>
                <button type='button' className='add-btn' id='add-wish'>Add a Wish</button>
                <WishInterface />
                <div className="display-container" id={styles["wish-display-container"]}>
                    <WishDisplay />
                    <WishDisplay />
                    <WishDisplay />
                    <WishDisplay />
                    <WishDisplay />
                </div>
            </div>
        )
    }
}

export default WishList;