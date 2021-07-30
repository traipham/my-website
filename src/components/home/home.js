import React from "react";
import { Link } from "react-router-dom";
import './home.css';

function homeBtn() {
    window.location = "/"
}

function Home() {
    return(
        <div className="home">
            <h2 className="heading" onClick={homeBtn}>Hello Me, this is your App! </h2>
            <div className="header">
                <nav>
                    <button type="button" className="home-btn" id="home-btn" onClick={homeBtn}>Home</button>
                    <button className="resume"><Link to="/resume">Resume</Link></button>
                    <button className="interest"><Link to="/interest">Interest</Link></button>
                    <button className="blog"><Link to="/blog">Blog</Link></button>
                    <button className="wish-list"><Link to="/wish-list">Wish List</Link></button>
                    <button className="goals"><Link to="/goals">Goals</Link></button>
                    <button className="random"><Link to="/random">Random</Link></button>
                    <button className="setting"><Link to="/setting">Setting</Link></button>
                </nav>
            </div>
        </div>
    )
}

export default Home;