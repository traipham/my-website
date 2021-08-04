import React from "react";
import { withRouter } from "react-router-dom";
import styles from './blog.module.css';
import { BlogPostInterface } from "./blogPostInterface";
import PropTypes from 'prop-types'
/**
 * Name of Component: Blog
 * 
 * Description: This will be a daily/weekly/monthly blog area. Each post 
 * TODO: 
 * - Have notes/text area in the right side where we'll be typing live notes down
 * - Have remove button on hover of the post
*/

/**
 * This is the component that is beng displyed based on inputs
 * @param {*} props 
 * @returns 
 */
export const DisplayBlogPost = (props) => {

    const postStyle = {
        display: 'flex',
        flexWrap:'wrap',
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        width: 'fit-content',
        maxWidth: 210,
        margin: 10,
        padding: 10
    }

    const indexStyle = {
        display: 'inline',
        marginRight: 10,
        border: '1px solid red',
        borderRadius: 5,
        padding: 5,
        width: 'fit-content'
    }

    const dateStyle = {
        display: 'inline',
        border: '2px solid black',
        padding: 5,
        width: 'fit-content'
    }

    return(
        <div className="container" id="post-container" style={postStyle}>
            <h4 className="header" id="index" style={indexStyle}>{props.index}</h4>
            <h3 className="header" id="date" style={dateStyle}>{props.date.toString().slice(0,16)}</h3>
            <img src={props.image} id="post-image" width="200px" height="200px"/>
            <br/>
            <p id="content">"{props.content}"</p>
            <br/>
            <hr/>
            <p id="location"><b>Location: </b><i>{props.location}</i></p>
        </div>
    )
}

DisplayBlogPost.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    image: PropTypes.string,
    content: PropTypes.string,
    location: PropTypes.string
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
            posts:[{
                content: 'default content',
                location: 'default location',
                image: 'default Image',
                date: new Date(),
                index: 0
            }]
        }

        this.setStateAddButton = this.setStateAddButton.bind(this);
        this.displayAddBlogPostInterface = this.displayAddBlogPostInterface.bind(this);
        this.displayBlogPostFunc = this.displayBlogPostFunc.bind(this);
    }


    displayBlogPostFunc(imgFile){
        const contentVal = document.getElementById('input-content').value;
        const locationVal = document.getElementById('input-location').value;
        const imgVal = imgFile;

        this.setState({
            addBtn: false,
            posts:[...this.state.posts, {
                content: contentVal,
                location: locationVal,
                image: imgVal,
                date: new Date(),
                index: Number(this.state.posts.length)
            }]
        })
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
            return <BlogPostInterface displayBlogPostFunc={this.displayBlogPostFunc}/>
        }
    }

    render(){
        return (
            <div className={styles.page}>
                <h1>My Blog</h1>
                <h2 style={{ float: 'right'}}>My Notes. . .</h2>
                <button type="button" className="add-post-btn" onClick={this.setStateAddButton} style={{ visibility: 'visible'}}>Add Post</button>
                {
                    this.displayAddBlogPostInterface()
                }
                <div className="container" id={styles["post-container"]}>
                    {
                        this.state.posts.slice(1).map((post) =>{
                            console.log(post);
                            return <DisplayBlogPost key={"post-"+post.index} content={post.content} location={post.location} image={post.image} date={post.date} index={post.index}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Blog;