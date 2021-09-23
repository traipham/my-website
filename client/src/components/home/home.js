import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './home.css';
import WelcomeDisplay from './welcomeMsg.js';
import OnClickConfetti from './confetti';
import Particles from 'react-tsparticles';

import house from './house-icon.jpg';
function Home() {
    const [welcome, setWelcome] = useState(false);

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
        setWelcome(true);

        document.getElementById('click-me-btn').style.boxShadow = "rgba(0, 0, 0, 0.774) 0px 0px 0px 0px";
        document.getElementById('click-me-btn').style.padding = "12px";
        document.getElementById('click-me-btn').style.background = "lightgreen";
    }

    return(
        <div className="home">
            {/* <h2 className="heading" onClick={homeBtn}>Trai's Website</h2> */}
            <div className="header" >
                <nav className='pages-nav'>
                    <button type="button" id="home-btn" id="home-btn" onClick={homeBtn}><img src={house} width="30px" height="30px" /></button>
                    <Link id={styles['resume-link']} to="/resume"><button id="resume" onClick={handleClick}>Resume</button></Link>
                    <Link id={styles['interest-link']} to="/interest"><button id="interest" onClick={handleClick}>Interest</button></Link>
                    <Link id={styles['blog-link']} to="/blog"><button id="blog" onClick={handleClick}>Blog</button></Link>
                    <Link id={styles['wish-list-link']} to="/wish-list"><button id="wish-list" onClick={handleClick}>Wish List</button></Link>
                    <Link id={styles['goals-link']} to="/goals"><button id="goals" onClick={handleClick}>Goals</button></Link>
                    {/* <Link id={styles['random-link']} to="/random"><button id="random" onClick={handleClick}>Leave a Note</button></Link> */}
                    {/*<Link to="/setting"><button className="setting" onClick={handleClick}>Setting</button></Link> */}
                    <p id="header-msg"> Hover over Me! </p>
                </nav>
            </div>
            {
                handleWelcomePage()
            }
            <div className="home-container" id="welcome-container" style={styleWelcome} >
                <WelcomeDisplay />
                {/* <h2 id="welcome-msg"><b>TO MY PAGE!</b></h2> */}
                <div className="btn-container" id="clickme-container">
                    <Link to="/resume"><button type="button" className="btn-btn" id="click-me-btn" onClick={handleWelcomeBtnOnClick}><b>Click Me!</b></button></Link>
                </div>
                {/* {
                    welcome ? <OnClickConfetti resetConfetti={resetConfetti}/> : null // Confetti display on click
                } */}
            </div>
        </div>
    )
}

export default Home;