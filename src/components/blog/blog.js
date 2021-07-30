import React from "react";
import styles from './blog.module.css';
/**
 * Name of Component: Blog
 * 
 * Description: This will be a daily/weekly/monthly blog area. Each post  
 */

/**
 * Functionality/Notes:
 * 
 *  Each post would should be numbered
 *  Remove button should appear when hovered over a post
 */
class Blog extends React.Component {
    render(){
        return (
            <div className={styles.page}>
                <h1>My Blog</h1>
                <button type="button" className="add-post-btn">Add</button>
                <button type="button" className="remove-post-btn">Remove</button>
            </div>
        )
    }
};

export default Blog;