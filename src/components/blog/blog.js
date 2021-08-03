import React from "react";
import styles from './blog.module.css';
import { BlogPostInterface } from "./blogPostInterface";
/**
 * Name of Component: Blog
 * 
 * Description: This will be a daily/weekly/monthly blog area. Each post  
 */

/**
 * This is the component that is beng displyed based on inputs
 * @param {*} props 
 * @returns 
 */
export const DisplayBlogPost = (props) => {
    let imgUrl = '';

    return(
        <div className="container" id="post-container">
            <h3 className="header" id="date">{props.date.toString().slice(0,16)}</h3>
            <h4 className="header" id="index">{props.index}</h4>
            <img src={imgUrl} id="post-image" />
            <p id="content">{props.content}</p>
            <br/>
            <hr/>
            <p id="location"><i>{props.location}</i></p>
        </div>
    )
}

/**
 * Functionality/Notes:
 * 
 *  Each post would should be numbered, content, image, location, date
 *  Remove button should appear when hovered over a post
 */
class Blog extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            addBtn: false,
            post:[{
                content: 'default content',
                location: 'default location',
                image: 'default Image',
                date: new Date(),
                index: 0
            }]
        }

        this.setStateAddButton = this.setStateAddButton.bind(this);
        this.displayAddBlogPostInterface = this.displayAddBlogPostInterface.bind(this);
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

    displayAddBlogPostInterface(){
        if (this.state.addBtn){
            return <BlogPostInterface />
        }
    }

    render(){
        return (
            <div className={styles.page}>
                <h1>My Blog</h1>
                <button type="button" className="add-post-btn" onClick={this.setStateAddButton}>Add Post</button>
                {
                    this.displayAddBlogPostInterface()
                }
                <div className="container" id="post-container">

                </div>
            </div>
        )
    }
};

export default Blog;