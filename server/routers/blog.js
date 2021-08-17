const mongoose = require('mongoose');
const router = require('express').Router();
const Blog = require('../models/blog');
const BlogHelper = require('../helper/blogHelper');

const blogHelper = new BlogHelper();

/**
 * Get all blog post 
 */
router.route('/').get((req, res) => {

    Blog.find()
        .then((blog) => res.json(blog))
        .catch(err => res.status(400).json('Error: ' + err))
})

/**
 * Add another blog post (pushing new post to blogPosts array)
 */
router.route('/addPost').post((req,res) => {
    const blogId = 1;

    const content = req.body.content;
    const location = req.body.location;
    const image = req.body.image;
    const index = req.body.index;
    const date = new Date();

    const addPost = {
        content: content,
        location: location,
        image: image,
        index: index,
        date: date
    }

    let newBlogPost = {}

    try{
        newBlogPost = Blog.findOne({ _id : blogId });
    // Make a new blog area ( won't be necessary ) for others
    } catch{
        blogHelper.createBlog(req, res);
        newBlogPost = Blog.findOne({ _id: blogId });
        res.status(400).json("Error: " + "Blog does not exist");
    }

    newBlogPost.then((resolve) => {
        resolve.blogPosts.push(addPost);
        resolve.save()
            .then(() => res.json("Blog Post added!"))
            .catch((err) => res.status(400).json("Error: " + err))
    })
})

module.exports = router;