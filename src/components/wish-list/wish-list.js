import React, {useState, useEffect} from "react";
import styles from './wish-list.module.css';
import defaultImg from './shield-hero-chibi.jpg'

/**
 * Overall functionality finished!
 * 
 * TODO:
 *  - DATABASE SET UP
 */

/**
 * Each wish is its own component
 *  - displays inputted information from interface 
 * @param {*} props 
 * @returns 
 */
export const WishDisplay = (props) => {

    // const imgURL = URL.createObjectURL(props.img);
    return(
        <div className="container" id={styles['wish-container']}>
            <button type="button" className="remove-btn" id="remove-wish">Remove this Wish</button>
            <p className="date" id="wish-date"><b>Date: </b>{new Date().toString().slice(0,16)}</p>
            <div className="header-grp" id={styles['title-tag-container']}>
                <h3 className="title" id={styles['wish-title']}>{props.title}</h3>
                <p className="tag" id="wish-tag">Tag: <i>{props.tag}</i></p>
            </div>
            <img src={props.img} className="component-img" id="wish-img" width="200px" height="200px"/>
            <p className="description" id="wish-description">{props.description}</p>
            <p><b>Rating:</b> {props.rating}</p>
        </div>
    )
}

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
export const WishInterface = (props) => {

    let fileURL = '';

    const handleImage = (e) => {
        e.preventDefault();
        const imgURL = URL.createObjectURL(e.target.files[0]);
        fileURL = imgURL;
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        props.displayWishFunc(fileURL);
    }

    return(
        <div className={styles["interface-container"]} id="wish-interface-container">
            <form onSubmit={handleSubmitForm} className={styles["form-container"]} id="wish-form-container">
                <h2 className="add-a-wish" id={styles["add-a-wish"]}>Add a Wish</h2>
                
                <label className="title" id="wish-int-title" htmlFor="input-wish-title"><b>Title: </b></label>
                <input type="text" className="input-title" id="input-wish-title" placeholder="I wish for..." ></input>

                <label className="tag" id="wish-int-tag" htmlFor="input-wish-tag"><b>Tag: </b></label>
                <select name="input-wish-tag" id="input-wish-tag" >
                    <option value="Personal">Personal</option>
                    <option value="Familial">Familial</option>
                    <option value="Random">Random</option>
                    <option value="Custom">Custom</option>
                </select>

                <label className="image" id="wish-int-img" htmlFor="input-wish-img"><b>Select image: </b></label>
                <input type="file" id="input-wish-img" name="input-wish-img" accept="image/*" onChange={handleImage}></input>

                <label className="description" id="wish-int-description" htmlFor="input-wish-description"><b>Description: </b></label>
                <input type="text" className="input-description" id="input-wish-description" placeholder="Describe wish..." ></input>

                <label className="rating" id="wish-int-rating" htmlFor="input-wish-rating"><b>Rating(0-10): </b></label>
                <input type="number" id="input-wish-rating" name="input-wish-rating" min="0" max="10" placeholder="0" ></input>

                <button type='submit' id={styles["submit-btn"]} value="Submit" >Submit</button>
                <button type="reset" id={styles["reset-btn"]} value="Reset">Reset</button>
            </form>
        </div> 
    )
}
/**
 * Main component for displaying everything. This is the page component itself
 * This is the parent component that contains all the states
 *  
 */
class WishList extends React.Component {
    
    constructor(props){
        super(props)

        this.state={
            addBtn: false,
            noWish: true,
            displayWish: [{
                title: 'Default title',
                tag: 'Personal',
                description: 'Default description about wish',
                img: defaultImg,
                rating: 10,
                date: new Date(),
                index: 0
            }]
        }

        this.setStateAddButton = this.setStateAddButton.bind(this);
        this.displayAddWishInterface = this.displayAddWishInterface.bind(this);
        this.displayWishFunc = this.displayWishFunc.bind(this);
    }

    displayWishFunc(imgFile){
        const titleVal = document.getElementById("input-wish-title").value;
        const tagVal = document.getElementById("input-wish-tag").value;
        const descriptionVal = document.getElementById("input-wish-description").value;
        const imgVal = imgFile;
        const ratingVal = document.getElementById("input-wish-rating").value;
        
        this.setState({
            ...this.state,
            addBtn: false,
            noWish: false,
            displayWish: [...this.state.displayWish,{
                title: titleVal,
                tag: tagVal,
                description: descriptionVal,
                img: imgVal,
                rating: ratingVal,
                date: new Date(),
                index: this.state.displayWish.length
            }]
        })
    }

    setStateAddButton() {
        this.setState({
            ...this.state,
            addBtn: true
        })
    }

    displayAddWishInterface() {
        if (this.state.addBtn) {
            return <WishInterface displayWishFunc={this.displayWishFunc} setImage={this.setImage}/>
        }
    }

    render(){
        return (
            <div className={styles.page}>
                <h1>My Wishes</h1>
                <button type='button' className='add-btn' id='add-wish' onClick={this.setStateAddButton}>Add a Wish</button>
                {
                    this.displayAddWishInterface()
                }
                <div className="display-container" id={styles["wish-display-container"]}>
                    {
                        //Iterate through the array ignoring the first initial element
                        this.state.displayWish.slice(1).map(wish =>{
                            if(this.state.noWish){
                                return;
                            } else {
                                console.log(wish);
                                return <WishDisplay key={"wish-"+wish.index}  title={wish.title} description={wish.description} tag={wish.tag} img={wish.img} rating={wish.rating} />
                            }
                    //***TEST STATE VALUES WHEN SUBMIT ***/

                            // if(this.state.noWish){
                            //     return;
                            // } else {
                            //     console.log(wish.title);
                            //     console.log(wish.tag);
                            //     console.log(wish.description);
                            //     console.log(wish.img);
                            //     console.log(wish.rating);
                            // }
                        })
                    }
                </div>
            </div>
        )
    }
}

export default WishList;