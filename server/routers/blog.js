// Blog router
const mongoose = require('mongoose');
const router = require('express').Router();
const Blog = require('../models/blog');
const BlogHelper = require('../helper/blogHelper');

const blogHelper = new BlogHelper();

/**
 * GET all blog post 
 */
router.route('/').get((req, res) => {

    Blog.find()
        .then((blog) => {
            // If blog collection does not exist, create one
            // Error: (node:24072) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: 
            // Cannot set headers after they are sent to the client
            // ( use db.createCollection() )
            if (Object.keys(blog).length === 0) {
                const log = blogHelper.createBlog(req, res);
                console.log(log);
            }
            res.json(blog);
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

/**
 * ADD another blog post (pushing new post to blogPosts array)
 */
router.route('/addPost').post((req,res) => {
    const blogId = 1; // TODO: Generate unique Id?

    // Get user input
    const blogPostId = new mongoose.Types.ObjectId;
    const content = req.body.content;
    const location = req.body.location;
    const image = req.body.image;
    const index = req.body.index;
    const date = new Date(); // TODO: input date?

    // Store values in object
    const addPost = {
        _id: blogPostId,
        content: content,
        location: location,
        image: image,
        index: index,
        date: date
    }

    // Reference variable to mongoDB blog query
    let newBlogPost = {}

    try{
        // Find specific blog query based on Id (only 1)
        newBlogPost = Blog.findOne({ _id : blogId });
    } catch{
        return res.status(400).json("Error: " + "Blog does not exist");
    }

    // Add user input to the blog query
    newBlogPost.then((resolve) => {
        resolve.blogPosts.push(addPost);
        try {
            resolve.save();
        } catch (err) {
            return res.status(400).json("Error: " + err)
        }
        return res.json("Blog Post added!");
    })
})

module.exports = router;