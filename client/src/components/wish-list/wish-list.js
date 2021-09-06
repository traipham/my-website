import React, {useState, useEffect} from "react";
import styles from './wish-list.module.css';
import defaultImg from './shield-hero-chibi.jpg'
import Loading from '../loading/loading';
import PropTypes from 'prop-types';
import  WishPostInterface from './wishPostInterface';
import axios from 'axios';
/**
 * Overall functionality finished!
 * 
 * TODO:
 *  - DATABASE SET UP
 *  - Remove wish
 */

/**
 * Each wish is its own component
 *  - displays inputted information from interface 
 * @param {*} props 
 * @returns 
 */
export const WishDisplay = (props) => {
    // console.log("This is the idea of this Wish: " + props.index);
    
    /**
     * Make button visible when hovering over post
     * @param {*} e - event object for onMouseOver of post container
    */
    const handleMouseOver = (e) =>{
        document.getElementById("remove-wish-" + props.index).style.display = 'inline-block';
        document.getElementById("remove-wish-" + props.index).style.visibility = 'visible';
    }
    
    /**
     * Make button hidden when moving out of post
     * @param {*} e - event object for onMouseOut of post container
    */
    const handleMouseOut = (e) => {
        document.getElementById("remove-wish-" + props.index).style.display = 'none';
        document.getElementById("remove-wish-" + props.index).style.visibility = 'hidden';
    }

    /**
     * Remove wish at index
     * @param {*} e - event object for onClick event of remove button
     */
    const removeWishOnClickBtn = async (e) => {
        props.displayLoading();
        const indexToDelete = props.index - 1;
        const success = await axios.delete('/wish-list/delete/1', { data: { index: indexToDelete} });
        // Log result msg
        console.log(success.data)
        if(success.status === 200){
            props.removeWish(indexToDelete+1);
            // window.location.reload();
        } 
    }

    /**
     * Display image if user input image
     * @returns img jsx element
     */
    const imageExist = () => {
        if(props.img === undefined){
            return
        } else {
            let imgB64 = Buffer.from(props.img.data).toString('base64');
            return <img src={`data:image/jpeg;base64,${imgB64}`} className={styles["img"]} id="wish-img" width="200px" height="200px" />;
        }
    }

    return(
        <div className="container" id={styles['wish-container']} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <button type="button" className={styles["remove-btn"]} id={"remove-wish-"+props.index} onClick={removeWishOnClickBtn}><b>Remove this Wish</b></button>
            <p className="index" id={styles["wish-num"]}><b>Wish #: </b><i>{props.index}</i></p>
            <p className="date" id="wish-date"><b>Date: </b>{props.date.toString().slice(0,10)}</p>
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
            loading: false,
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
        this.setRemoveWish = this.setRemoveWish.bind(this);
        this.displayAddWishInterface = this.displayAddWishInterface.bind(this);
        this.displayWishFunc = this.displayWishFunc.bind(this);
        this.closeInterface = this.closeInterface.bind(this);
        this.displayLoading = this.displayLoading.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.removeDisplayLoading = this.removeDisplayLoading.bind(this);
        // this.displayLoading = this.displayLoading.bind(this);
    }
    /**
     * Get data from mongo and update information when component first mounts (when reload)
     */
    componentDidMount(){
        // Get array of wishes
        this.setState({
            ...this.state,
            loading: true
        })
        setTimeout(async () => {
            const arrWishes = await axios.get('/wish-list/posts').then((res) => { return res.data[0].wishes });
            console.log(arrWishes);
            let indexCount = 1;
            arrWishes.forEach(wish => {
                this.setState({
                    addBtn: false,
                    noWish: false,
                    loading: false,
                    displayWish: [...this.state.displayWish, {
                        title: wish.title,
                        tag: wish.tag,
                        description: wish.description,
                        img: wish.img,
                        rating: wish.rating,
                        date: wish.date,
                        index: indexCount++
                    }]
                })
            });
            document.getElementById('add-wish').style.visibility = 'visible';
        })
    }

    /**
     * set state values, and transfer state info to display Component
     * 
     * @param {*} imgFile image file that will be displayed if inputted
     */
    displayWishFunc(){
        // Set state of recently added post
        let arrWishes = {};
        setTimeout(async () => {
            this.setState({
                ...this.state,
                addBtn: false,
                noWish: false,
                loading: true
            })
            console.log("loading: " + this.state.loading);
            arrWishes = await axios.get('/wish-list/posts').then((res) => { return res.data[0].wishes });
            console.log(arrWishes);
            const addWish = arrWishes[arrWishes.length - 1];
            this.setState({
                ...this.state,
                loading: false,
                displayWish: [...this.state.displayWish, {
                    title: addWish.title,
                    tag: addWish.tag,
                    description: addWish.description,
                    img: addWish.img,
                    rating: addWish.rating,
                    index: arrWishes.length,
                    date: addWish.date
                }]

            })
        });

        // Make "Add a wish" button visible
        document.getElementById('add-wish').style.visibility = 'visible';
    }

    /**
     * Set the state 'addBtn' to true when 'Add a Wish' button is clicked
     */
    setStateAddButton() {
        this.setState({
            ...this.state,
            addBtn: true
        })
    }

    /**
     * When user click on exit button of interface, this will close the interface 
     */
    closeInterface(){
        this.setState({
            ...this.state,
            addBtn: false
        });
        document.getElementById('add-wish').style.visibility = 'visible';
    }

    displayLoading(){
        if(this.state.loading){
            return <Loading loading={this.state.loading} />
        }
    }
    
    removeDisplayLoading(){
        this.setState({
            ...this.state,
            loading: true
        })
    }

    /**
     * Displays wish Interface when "Add a wish" button is clicked
     * @returns WishInterface 
     */
    displayAddWishInterface() {
        if (this.state.addBtn) {
            document.getElementById('add-wish').style.visibility = 'hidden';
            return <WishPostInterface displayWishFunc={this.displayWishFunc} closeInterface={this.closeInterface}/>
        }
    }

    handleOnScroll(){
        document.getElementById('wish-page').style.position = 'fixed';
        console.log('this works!');
    }

    /**
     * delete array element without relaoding
     * @param {*} indexToDelete - index of where we're deleting
     */
    setRemoveWish(indexToDelete){
        const arrWishes = this.state.displayWish;
        arrWishes.splice(indexToDelete, 1);
        for (let i = indexToDelete; i < arrWishes.length; i++) {
            arrWishes[i].index = arrWishes[i].index - 1;
        }
        this.setState({
            ...this.state,
            loading: false,
            displayWish: arrWishes
        })
    }

    render(){
        return (
            <div className={styles.page} id="wish-page">
                <h1 className={styles["header"]} id="wishlist-header">My Wishes</h1>
                <button type='button' className={styles['add-wish']} id='add-wish' onClick={this.setStateAddButton}>Add a Wish</button>
                {
                    this.displayAddWishInterface()
                }
                {
                    this.displayLoading(this.state.loading)
                }
                <div className="display-container" id={styles["wish-display-container"]}>
                    {
                        //Iterate through the array ignoring the first initial element
                        this.state.displayWish.slice(1).map(wish =>{
                            if(this.state.noWish || this.state.addBtn){
                                return;
                            } else {
                                return <WishDisplay key={"wish-" + wish.index} removeWish={this.setRemoveWish} index={wish.index}  title={wish.title} description={wish.description} tag={wish.tag} img={wish.img} rating={wish.rating} date={wish.date} displayLoading={this.removeDisplayLoading}/>
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