import React, {useState} from "react";
import { Link } from "react-router-dom";
import './home.css';


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

    const handleClick = () =>{
        document.getElementById('welcome-container').style.display = "none";
    }

    return(
        <div className="home">
            <h2 className="heading" onClick={homeBtn}>Hello Me, this is your App! </h2>
            <div className="header">
                <nav>
                    <button type="button" className="home-btn" id="home-btn" onClick={homeBtn}>Home</button>
                    <button className="resume" onClick={handleClick}><Link to="/resume">Resume</Link></button>
                    <button className="interest" onClick={handleClick}><Link to="/interest">Interest</Link></button>
                    <button className="blog" onClick={handleClick}><Link to="/blog">Blog</Link></button>
                    <button className="wish-list" onClick={handleClick}><Link to="/wish-list">Wish List</Link></button>
                    <button className="goals" onClick={handleClick}><Link to="/goals">Goals</Link></button>
                    <button className="random" onClick={handleClick}><Link to="/random">Random</Link></button>
                    <button className="setting" onClick={handleClick}><Link to="/setting">Setting</Link></button>
                </nav>
            </div>
            {
                handleWelcomePage()
            }
            <div className="home-container" id="welcome-container" style={styleWelcome}>
                <h2><b>Welcome to my Page!</b></h2>
                <div className="home-container" id="btn-container">
                    <button type="button" className="btn-btn" id="click-me-btn"><b>Click Me!</b></button>
                </div>
            </div>
        </div>
    )
}

export default Home;