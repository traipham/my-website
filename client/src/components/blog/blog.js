import React from "react";
import { withRouter } from "react-router-dom";
import styles from './blog.module.css';
import BlogPostInterface from "./blogPostInterface";
import PropTypes from 'prop-types'
import axios from 'axios';

/**
 * This is the component that is beng displyed based on inputs
 * @param {*} props - contains parent's state to display info
 * @returns 
 */
export const DisplayBlogPost = (props) => {

    const postStyle = {
        // display: 'flex',
        // flexWrap:'wrap',
        // justifyContent: "space-between",
        // alignContent: "space-around",
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        // width: 'fit-content',
        maxWidth: 200,
        width: 200,
        height: 'fit-content',
        margin: 10,
        padding: 10
    }

    const indexStyle = {
        display: "inline-block",
        float: 'right',
        margin: '0 0 0 auto',
        border: '1px solid red',
        borderRadius: 5,
        padding: 5,
        width: 'fit-content',
        height: 'fit-content',
    }

    const dateStyle = {
        border: '2px solid black',
        padding: 5,
        width: 'fit-content',
    }

    let btnStyle = {
        display: "inline-block",
        backgroundColor: 'red',
        visibility: 'hidden',
        width: "fit-content",
        height: "fit-content",
    }

    /**
     * Remove functionality 
     * @params
     * @returns
     */
    async function handleRemoveBtn() {
        // Get index of post
        const indexToDelete = props.index - 1;

        // Delete post at index
        const success = await axios.delete('/blog/delete/1', { data: { index: indexToDelete }});

        // Reload page when deleted successfully
        if(success.status === 200){
            window.location.reload();
        } else {
            console.log(success.data);
        }
    }

    /**
     * Display image if image was inputted
     * @returns jsx img element if image exists
     */
    function imageExist() { 
        // If there isn't an image
        if(props.image === undefined){
            return
            // else return jsx img element 
        } else {
            let imgB64 = Buffer.from(props.image.data).toString('base64')
            return <img src={`data:image/jpeg;base64,${imgB64}`} id="post-image" width="200px" height="200px" />;
        }
    }
    /**
     * Display remove button when hovered over post
     */
    function containerOnHover(){
        document.getElementById(`blog-btn-${props.index}`).style.visibility = 'visible';
    }

    /**
     * Hide remove button when not hovered over post
     */
    function containerMouseOut(){
        document.getElementById(`blog-btn-${props.index}`).style.visibility = 'hidden';
    }

    return(
        <div className="container" id="post-container" style={postStyle} onMouseOver={containerOnHover} onMouseOut={containerMouseOut}>
            <button type="button" className="btn" id={"blog-btn-" + props.index} onClick={handleRemoveBtn} style={btnStyle}>Remove</button>
            <h4 className="header" id="index" style={indexStyle}>{props.index}</h4>
            <h3 className="header" id="date" style={dateStyle}>{props.date.toString().slice(0,10)}</h3>
            {
                imageExist()
            }
            {/* <img src={`data:image/jpeg;base64,${imgB64}`} id="post-image" width="200px" height="200px"/> */}
            <br/>
            <p id="content">"{props.content}"</p>
            <br/>
            <hr/>
            <p id="location"><b>Location: </b><i>{props.location}</i></p>
        </div>
    )
}

/**
 * Type checking for props of DisplayBlogPost Component
 */
DisplayBlogPost.propTypes = {
    index: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.object,
    content: PropTypes.string,
    location: PropTypes.string
}

/**
 * This will be a daily/weekly/monthly blog area. Each post may contain
 * content, image, location
 * TODO:
 * - Have notes/text area in the right side where we'll be typing live notes down
*/
class Blog extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            addBtn: false,
            posts:[{
                content: 'default content',
                location: 'default location',
                image: {},
                date: new Date(),
                index: 0
            }]
        }

        this.setStateAddButton = this.setStateAddButton.bind(this);
        this.displayAddBlogPostInterface = this.displayAddBlogPostInterface.bind(this);
        this.displayBlogPostFunc = this.displayBlogPostFunc.bind(this);
    }

    componentDidMount(){
        // GET blog document in mongo
        setTimeout(async () => {
            const posts = await axios.get('/blog/').then((res) => { return res.data[0].blogPosts });
            console.log(posts);
            let counter = 1;
            posts.forEach((post) => {
                this.setState({
                    addBtn: false,
                    posts: [...this.state.posts, {
                        content: post.content,
                        location: post.location,
                        image: post.image,
                        index: counter++,
                        date: post.date,
                    }]
                })
            })
        })
    }

    /**
     * Display most recently added post
     * @params
     * @returns
     */
    async displayBlogPostFunc(){
        setTimeout( async() => {
            const posts = await axios.get('/blog/').then((res) => { return res.data[0].blogPosts });
            console.log(posts);
            const post = posts[posts.length-1];
            this.setState({
                addBtn: false,
                posts: [...this.state.posts, {
                    content: post.content,
                    location: post.location,
                    image: post.image,
                    index: this.state.posts.length,
                    date: post.date,
                }]
            })
        }, 300);
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
     * Displays the interface for inputting new blog posts
     * @returns JSX element of input form
     */
    displayAddBlogPostInterface(){
        if (this.state.addBtn){
            return <BlogPostInterface index={this.state.posts.length} displayBlogPostFunc={this.displayBlogPostFunc}/>
        }
    }

    render(){
        return (
            <div className={styles.page}>
                <h1>My Blog</h1>
                <h2 style={{ float: 'right'}}>Feedback. . .</h2>
                <button type="button" className="add-post-btn" onClick={this.setStateAddButton} style={{ visibility: 'visible'}}>Add Post</button>
                {
                    this.displayAddBlogPostInterface()
                }
                <div className="container" id={styles["post-container"]}>
                    {
                        this.state.posts.slice(1).map((post) =>{
                            // console.log(post);
                            return <DisplayBlogPost key={"post-"+post.index} content={post.content} location={post.location} image={post.image} date={post.date} index={post.index}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Blog;