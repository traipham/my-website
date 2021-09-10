import React from "react";
import styles from './resume.module.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import resumePDF from './resume.pdf';
import DisplayResume from "./pdf.component";
import Me from './Me.jpg';
import NewResume from "./new_resume.jpg"

const Linkedin = <a href="https://www.linkedin.com/in/trai-pham-4a1272198/">Linkedin</a>
const GitHub = <a href="https://github.com/traipham">GitHub</a>
const HandShake = <a href="https://ucsd.joinhandshake.com/users/18070890">HandShake</a>
/**
 * Name of Component: Resume
 * 
 * Description: This component is a page that would show my resume. I will be able to UPLOAD a new resume 
 * replacing the current one and DOWNLOAD the current resume.
 */
class Resume extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            focus: false
        }

        this.focusFunc = this.focusFunc.bind(this);
    }

    componentDidUpdate(){
        window.location.reload();
    }

    focusFunc(){
        this.setState({
            focus: true
        })
    }

    render(){
        return (
            <div className={styles.page}>
                <h1 className={styles["header"]}>About Me</h1>
                <div className={styles['page-container']}>
                    <p>This page will contain my <b>resume</b> and other sources</p>
                    {Linkedin}<br /><br />
                    {GitHub}<br /><br />
                    {HandShake}
                    <h3>Personal Description</h3>
                    <div className={styles['img-container']}>
                        <img src={Me} width='200px' height='200px' />
                    </div>
                    <div id={styles["gradient-border"]}>
                        <div id={styles["my-description-container"]}>
                            <p id={styles["my-description"]}>
                                Hi! My name is Trai Pham and I am currently an undergraduate studying at the University of California San Diego.
                                I'm pursuing the B.S. in Computer Science. I'm Vietnamese, born and raised for 5 years in Vietnam, until my family
                                decided to move the United States to start a new life. Academically speaking, I've attended 3 different Elementary schools,
                                due to familial and financial adversity. Fortunately, I was able to spend my middle and high school years in the same area,
                                which was the city of Garden Grove. I attended Doig Intermediate for middle school. I went to Santiago for high school. I've
                                learned a lot in highschool, enrolling in numerous AP classes, participated in many clubs, and played Football all throughout highschool.
                                High school was a place where I learned a lot about self-discipline as well as perseverance. I was academically honored a long side
                                being a role model in football. Presently, I've graduated from highschool and now I am going into my next year of undergrad.
                            </p>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <h3>Programing/Computer Experience</h3>
                    <p id="p-experience">--experience here--</p>
                    <hr id="h-line"></hr>
                    <div className={styles.container} id='container'>
                        <h2 id={styles['resume-header']}>Resume</h2>
                        <img src={NewResume} id={styles['resumePdf']} alt="resume" width="750px" height="980px" />
                        {/* <DisplayResume/> */}
                        <button type='button' className={styles['focus-btn']} id='focus-btn' onClick={this.focusFunc}>Focus</button>
                        <p>(Zoom in and click focus to see pdf clearer)</p>
                    </div>
                    <button type="button" className="upload-btn" >Upload</button>
                    <button type="button" className="download-btn">Download</button>
                </div>
            </div>
        )
    }
}

export default Resume;