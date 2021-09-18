import React from 'react';
import styles from './random.module.css';
import genshin from './genshin_impact.png';
import Display from './display.component.js';

import Reward from 'react-rewards';
/**
 * Favorite Game with stat objects
 */
const myFavoriteGame = {
    name: "Genshin Impact",
    genres: ["Action", "Adventure", "Open-world"],
    rating: 9.4,
    author: "Mihoyo"
}
/**
 * Colors hexadecimal
 */
const orange = '#FF6D00';
const red = '#FF0000';
const green = '#00FF32';
const blue = '#0070FF';


const genshinIcon = <img src={genshin} alt="genshin-icon" width="50px" height="50px"/>

class Random extends React.Component{
    constructor(props){
        super(props);

        // Functions
        this.setName = this.setName.bind(this);
        this.setPageColor = this.setPageColor.bind(this);
        this.setPrintGame = this.setPrintGame.bind(this);
        this.fetchSomeData = this.fetchSomeData.bind(this);

        // State
        this.state = {
            game:{
                name: "Genshin Impact",
                genres: ["Action", "Adventure", "Open-world"],
                rating: 9.4,
                author: "Mihoyo"
            },
            pageColor: orange,
            printGameStat: false
        }
    }

    componentDidMount(){
        this.reward.rewardMe();
    }

    setPrintGame() {
        this.setState({
            printGameStat: true
        })
    }

    /**
     * Change the background color 
     */
    setPageColor(){
        let newPageColor;
        if ( this.state.pageColor === green){
            newPageColor = orange;
        } else if ( this.state.pageColor === blue){
            newPageColor = red;
        } else if ( this.state.pageColor === red) {
            newPageColor = green;
        } else {
            newPageColor = blue;
        }

        this.setState({
            pageColor: newPageColor
        });
        document.querySelector('.' + styles['random-page']).style['background-color'] = this.state.pageColor;
    }

    /**
     * Change name state and value 
     *
     */
    setName(value){
        this.setState({
            game:{
                ...this.state.game,
                name: value,
            }
        })
        setTimeout(() => {console.log("This is the new state.game.name: " + this.state.game.name)}, 100);
    }


    testFunc(){
        alert("THIS WORKS!");
    }

    fetchSomeData(){
        this.reward.rewardMe();
    }

    render(){
        // const propsOfRandom = JSON.stringify(this.props);
        // console.log("This is the props of random object " + propsOfRandom);

        return(
            <div className={styles['random-page']}>
                <div className={styles.heading}>
                    <h1 className="header">Leave a Note for Me!</h1>
                    <button type="button" className={styles['color-btn']} id="change-color-btn" onClick={this.setPageColor}>Change Page Color</button>
                </div>
                <br/>
                <button type="button" className="print-fav-game-btn" id="print-fav-game-btn" onClick={(this.setPrintGame)}>Print Game Stats</button>
                {genshinIcon}
                <br/>
                <label id="name" className="name"></label>
                <input id="input-name" className={styles['input-name']} htmlFor="input-name" placeholder="Game Name" />
                <button type="button" id="input-btn" className="confirm-btn" onClick={() => this.setName(document.getElementById('input-name').value)}> Save Input </button>
                <br/>
                <div className={styles['game-container']}>
                    {
                    this.state.printGameStat ?
                    Object.keys(this.state.game).map((item) => {
                        return <p key={"s-i-"+ item}><b>{item.charAt(0).toUpperCase() + item.slice(1)}</b>: {this.state.game[item]}</p>
                    }) : <div></div>
                    }
                </div>
                <Display testFunc={this.testFunc}/>
                <Reward
                    ref={(ref) => { this.reward = ref }}
                    type='emoji'
                >
                    <button onClick={this.fetchSomeData}>Reward</button>
                </Reward>
            </div>
        )
    }
}

export default Random;