// Blog router
const mongoose = require('mongoose');
const router = require('express').Router();
const Blog = require('../models/blog');
// const BlogPost = require('../models/blogPost');
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
    const index = Number(req.body.index);
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

/**
 * GET specific blog query/collection
 *  NOTE NEEDED ? 
 */
// router.route('/:id').get((req, res) => {
//     // THIS WILL GET YOU THE INDIVIDUAL BLOG ITSELF
//     // const blogQuery = Blog.findOne({ _id: 1 });

//     // blogQuery.then((blog) => {
//     //     blog.blogPosts.forEach((post)=>{
//     //         try{
//     //             if (String(post._id) === req.params.id) {
//     //                 return res.json(post);
//     //             }
//     //         } catch (err) {
//     //             return res.status(400).json("Error: " + err)
//     //         }
//     //     })
//     // })
//     // .catch((err) => {return res.status(400).json("Error: " + err)});

//     Blog.findById(req.params.id)
//         .then((blog) => res.json(blog))
//         .catch((err) => res.status(400).json("Error: " + err))
// })

/**
 * DELETE specific blog post
 */
router.route('/delete/:id').delete((req, res) => {
    // Get specific index to delete
    const index = req.body.index;

    Blog.findById(req.params.id)
        .then((blogPost) => {
                blogPost.blogPosts.splice(1, index)

                blogPost.save()
                    .then(() => res.json("Deleted post!"))
                    .catch((err) => res.status(400).json("Error: " + err))
            })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * UPDATE specific blog Post
 */
router.route('/update/:id').post((req, res) => {
    // Get updated user input
    const blogPostId = req.body._id;
    const content = req.body.content;
    const location = req.body.location;
    const image = req.body.image;
    const index = Number(req.body.index);
    const date = new Date();
    // Find specific Blog collection based on Id
    Blog.findById(req.params.id)
        .then((blogPost) => {
            blogPost.blogPosts.forEach((post) => {
                // Find specific post based on inputted Id
                if (String(post._id) === blogPostId) {
                    // Update specific post
                    post.content = content;
                    post.location = location;
                    post.image = image;
                    post.index = index;
                    post.date = date;
                    // Save to collection
                    blogPost.save()
                        .then(() => res.json('Post updated!'))
                        .catch((err) => res.status(400).json("Error: " + err))
                }
            })
        })
        .catch( (err) => res.status(400).json("Error: " + err))
})
module.exports = router;