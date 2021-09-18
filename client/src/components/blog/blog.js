import React from "react";
import Reward from 'react-rewards';
import styles from './blog.module.css';
import BlogPostInterface from "./blogPostInterface";
import DisplayBlogPost from "./blogDisplay";
import Loading from '../loading/loading';
import axios from 'axios';


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
            loading: false,
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
        this.displayLoading = this.displayLoading.bind(this);
        this.displayAddBtn = this.displayAddBtn.bind(this);
        this.removeDisplayLoading = this.removeDisplayLoading.bind(this);
        this.removeInterface = this.removeInterface.bind(this);
    }

    componentDidMount(){
        this.setState({
            ...this.state,
            loading: true
        })
        // GET blog document in mongo
        setTimeout(async () => {
            const posts = await axios.get('/blog/posts/').then((res) => { return res.data[0].blogPosts });
            console.log(posts);
            let counter = 1;
            posts.forEach((post) => {
                this.setState({
                    addBtn: false,
                    loading: false,
                    posts: [...this.state.posts, {
                        content: post.content,
                        location: post.location,
                        image: post.image,
                        index: counter++,
                        date: post.date,
                    }]
                })
            })
            document.getElementById('blog-add-btn').style.visibility = "visible";
            this.reward.rewardMe();
        })
    }

    /**
     * Display most recently added post
     * @params
     * @returns
     */
    async displayBlogPostFunc(){
        this.setState({
            ...this.state,
            loading: true
        })
        setTimeout( async() => {
            const posts = await axios.get('/blog/posts/').then((res) => { return res.data[0].blogPosts });
            console.log(posts);
            const post = posts[posts.length-1];
            this.setState({
                addBtn: false,
                loading: false,
                posts: [...this.state.posts, {
                    content: post.content,
                    location: post.location,
                    image: post.image,
                    index: this.state.posts.length,
                    date: post.date,
                }]
            })
            document.getElementById('blog-add-btn').style.visibility = "visible";
            this.reward.rewardMe();
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
     * Set state of addBtn to false to not display interface
     */
    removeInterface(){
        this.setState({
            ...this.state,
            addBtn: false,
        })
        document.getElementById('blog-add-btn').style.visibility = "visible";
    }

    /**
     * Mount loading component to parent component
     * @returns Loading component
     */
    displayLoading() {
        if (this.state.loading) {
            return <Loading loading={this.state.loading} />
        }
    }

    /**
     * This will display the add button if we're in development, but not production
     * @returns void
     */
    displayAddBtn() {
        console.log(process.env.NODE_ENV);
        if(process.env.NODE_ENV === 'development'){
            return <button type="button" className={styles["add-post-btn"]} id="blog-add-btn" onClick={this.setStateAddButton}>Add Post</button>;
        } else {
            console.log("Status: Production (can not add)");
        }
    }

    /**
     * Set state for loading when removing goal
     */
    removeDisplayLoading() {
        this.setState({
            ...this.state,
            loading: true
        })
        this.reward.rewardMe();
    }

    /**
     * Displays the interface for inputting new blog posts and hide add button
     * @returns JSX element of input form
     */
    displayAddBlogPostInterface(){
        if (this.state.addBtn){
            document.getElementById('blog-add-btn').style.visibility = "hidden";
            return <BlogPostInterface index={this.state.posts.length} displayBlogPostFunc={this.displayBlogPostFunc} removeInterface={this.removeInterface}/>
        }
    }

    render(){
        return (
            <div className={styles.page}>
                <div className={styles['reward']} id="reward-container">
                    <Reward
                        ref={(ref) => { this.reward = ref }}
                        type='emoji'
                        config={{
                            zIndex: 10000,
                            spread: 180
                        }}
                    >
                        <p id="reward"></p>
                    </Reward>
                </div>
                <h1 className={styles["header"]} id="blog-header">My Blog</h1>
                {
                    this.displayLoading()
                }
                <h2 className={styles['post-comments']} id='blog-comments'>Feedback. . .</h2>
                <button type="button" className={styles["add-post-btn"]} id="blog-add-btn" onClick={this.setStateAddButton}>Add Post</button>
                {
                    this.displayAddBlogPostInterface()
                }
                <div className="container" id={styles["post-container"]}>
                    {
                        this.state.posts.slice(1).map((post) =>{
                            // console.log(post);
                            return <DisplayBlogPost key={"post-"+post.index} content={post.content} location={post.location} image={post.image} date={post.date} index={post.index} removeDisplayLoading={this.removeDisplayLoading}/>
                        })
                    }
                </div>
            </div>
        )
    }
};

export default Blog;