import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './home.css';
import WelcomeDisplay from './welcomeMsg.js';

function Home() {


    const styleWelcome = {
        display: "block"
    }

    const homeBtn = () => {
        window.location = "/"
        document.getElementById('welcome-container').style.display = "block";
    }

    /**
     * Display welcome message when in home page
     */
    const handleWelcomePage = () => {
        // Get current path and check what page we're on
        const pathName = window.location.pathname.toString();
        console.log(pathName);
        if (pathName === "" || pathName === "/"){
            styleWelcome.display = "block"
        } else { 
            styleWelcome.display = "none"
        }
    }

    /**
     * Turn welcome display off
     * @param {*} e - event object for onClick of home button 
     */
    const handleClick = (e) =>{
        document.getElementById('welcome-container').style.display = "none";
    }
    /**
     * DIsplay a msg ( will update! )
     * @param {*} e - event object for onClcik of Welcome button 
     */
    const handleWelcomeBtnOnClick = (e) =>{
        window.alert(
            "WELCOME! This is my own personal website and is my first website built entirely by me from the ground up!\n\n" + 
            "Feel free to look around, but please don't submit any input. You can click on the buttons to check out the interface.\n\n" +
             "I'll make a new welcome format soon!"
            )
    }

    return(
        <div className="home">
            {/* <h2 className="heading" onClick={homeBtn}>Trai's Website</h2> */}
            <div className="header" >
                <nav className='pages-nav'>
                    <button type="button" id="home-btn" id="home-btn" onClick={homeBtn}>Home</button>
                    <p id="header-msg"> Hover over Me! </p>
                    <Link id={styles['resume-link']} to="/resume"><button id="resume" onClick={handleClick}>Resume</button></Link>
                    <Link id={styles['interest-link']} to="/interest"><button id="interest" onClick={handleClick}>Interest</button></Link>
                    <Link id={styles['blog-link']} to="/blog"><button id="blog" onClick={handleClick}>Blog</button></Link>
                    <Link id={styles['wish-list-link']} to="/wish-list"><button id="wish-list" onClick={handleClick}>Wish List</button></Link>
                    <Link id={styles['goals-link']} to="/goals"><button id="goals" onClick={handleClick}>Goals</button></Link>
                    {/* <Link to="/random"><button className="random" onClick={handleClick}>Leave a Note</button></Link>
                    <Link to="/setting"><button className="setting" onClick={handleClick}>Setting</button></Link> */}
                </nav>
            </div>
            {
                handleWelcomePage()
            }
            <div className="home-container" id="welcome-container" style={styleWelcome} >
                <WelcomeDisplay />
                <h2 id="welcome-msg"><b>Welcome to my Page!</b></h2>
                <div className="home-container" id="btn-container">
                    <button type="button" className="btn-btn" id="click-me-btn" onClick={handleWelcomeBtnOnClick}><b>Click Me!</b></button>
                </div>
            </div>
        </div>
    )
}

export default Home;