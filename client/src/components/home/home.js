import React, {useState} from "react";
import { Link } from "react-router-dom";
import styles from './home.css';


function Home() {

    const styleWelcome = {
        display: "block"
    }

    function homeBtn() {
        window.location = "/"
        document.getElementById('welcome-container').style.display = "block";
    }

    function handleWelcomePage() {
        // Get current link and check what page we're on
        const href = window.location.href.toString();
        if (href.slice(22, href.length) === ""){
            styleWelcome.display = "block"
        } else { 
            styleWelcome.display = "none"
        }
    }

    const handleClick = (e) =>{
        document.getElementById('welcome-container').style.display = "none";
    }

    return(
        <div className="home">
            <h2 className="heading" onClick={homeBtn}>Trai's Website</h2>
            <div className="header">
                <nav>
                    <button type="button" className="home-btn" id="home-btn" onClick={homeBtn}>Home</button>
                    <Link to="/resume"><button className="resume" onClick={handleClick}>Resume</button></Link>
                    <Link to="/interest"><button className="interest" onClick={handleClick}>Interest</button></Link>
                    <Link to="/blog"><button className="blog" onClick={handleClick}>Blog</button></Link>
                    <Link to="/wish-list"><button className="wish-list" onClick={handleClick}>Wish List</button></Link>
                    <Link to="/goals"><button className="goals" onClick={handleClick}>Goals</button></Link>
                    {/* <Link to="/random"><button className="random" onClick={handleClick}>Leave a Note</button></Link>
                    <Link to="/setting"><button className="setting" onClick={handleClick}>Setting</button></Link> */}
                </nav>
            </div>
            {
                handleWelcomePage()
            }
            <div className="home-container" id="welcome-container" style={styleWelcome}>
                <h2 id="welcome-msg"><b>Welcome to my Page!</b></h2>
                <div className="home-container" id="btn-container">
                    <button type="button" className="btn-btn" id="click-me-btn"><b>Click Me!</b></button>
                </div>
            </div>
        </div>
    )
}

export default Home;