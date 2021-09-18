import React, {useState, useEffect} from "react";
import Reward from 'react-rewards';
import styles from './wish-list.module.css';
import Loading from '../loading/loading';
import WishDisplay from './wishDisplay';
import WishPostInterface from './wishPostInterface';
import axios from 'axios';

/**
 * Main component for displaying everything. This is the page component itself
 * This is the parent component that contains all the states 
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
                img: undefined,
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
            this.reward.rewardMe();
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
        this.reward.rewardMe();
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
        this.reward.rewardMe();
    }

    render(){
        return (
            <div className={styles.page} id="wish-page">
                <div className={styles['reward']} id="reward-container">
                    <Reward
                        ref={(ref) => { this.reward = ref }}
                        type='emoji'
                        config={{
                            zIndex:10000,
                            spread: 180
                        }}
                    >    
                        <p id="reward"></p>
                    </Reward>
                </div>
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
                                return <WishDisplay key={"wish-" + wish.index} id={"wish-"+wish.index} removeWish={this.setRemoveWish} index={wish.index}  title={wish.title} description={wish.description} tag={wish.tag} img={wish.img} rating={wish.rating} date={wish.date} displayLoading={this.removeDisplayLoading}/>
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