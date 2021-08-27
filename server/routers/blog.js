// Blog router
const mongoose = require('mongoose');
const router = require('express').Router();
const multer = require('multer');
// const upload = require('../helper/uploadImg');
const fs = require('fs');
const path = require('path');

const Blog = require('../models/blog');
// const BlogPost = require('../models/blogPost');
const BlogHelper = require('../helper/blogHelper');
const blogHelper = new BlogHelper();


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage });


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
 * ADD blog post
 * 
 * @param {string} content - add content
 * @param {string} location - add location
 * @param {string} image - add image
 * @param {Number} index - add index
 */
router.post('/addPost', upload.single('image'), (req,res) => {
    const blogId = 1; // TODO: Generate unique Id?
    let image = {};

    const blogPostId = new mongoose.Types.ObjectId;
    const content = req.body.content;
    const location = req.body.location;
    const date = new Date(); // TODO: input date?

    let addPost = {}
    // If user don't put in image for post
    console.log('Uploaded files: ' + req.file);
    if(req.file === undefined){
        addPost = {
            _id: blogPostId,
            content: content,
            location: location,
            date: date
        }
        // If user put in image for post
    } else {
        image = {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
        // 
        addPost = {
            _id: blogPostId,
            content: content,
            location: location,
            image: image,
            date: date
        }
    }
    // const imgUrl = `http://localhost:5000/file/${req.file.filename}`;

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
        return res.json("Blog Post added! Image added: " + image);
    })
})

/**
 * DELETE specific blog post
 * @param {string} id - blog collection id
 * @param {Number} index - index of blog post to delete
 */
router.route('/delete/:id').delete((req, res) => {
    // Get specific index to delete
    const index = req.body.index;
    Blog.findById(req.params.id)
        .then((blogPost) => {
                blogPost.blogPosts.splice(index, 1)

                blogPost.save()
                    .then(() => res.json("Deleted post at index: " + index + "!"))
                    .catch((err) => res.status(400).json("Error: " + err))
            })
        .catch((err) => res.status(400).json("Error: " + err))
})

/**
 * UPDATE specific blog Post
 * @param {string} id - blog collection id
 * @param {string} blogPostId - specific blog post id 
 * @param {string} updateContent - updated content
 * @param {string} updateLocation - updated location
 * @param {string} updateImage - updated image
 * @param {Number} updateIndex - updated index
 */
router.route('/update/:id').post((req, res) => {
    // Get updated user input
    const blogPostId = req.body._id;
    const updateContent = req.body.content;
    const updateLocation = req.body.location;
    const updateImage = req.body.image;
    const updateIndex = Number(req.body.index);
    const updateDate = new Date();
    // Find specific Blog collection based on Id
    Blog.findById(req.params.id)
        .then((blogPost) => {
            blogPost.blogPosts.forEach((post) => {
                // Find specific post based on inputted Id
                if (String(post._id) === blogPostId) {
                    // Update specific post
                    post.content = updateContent;
                    post.location = updateLocation;
                    post.image = updateImage;
                    post.index = updateIndex;
                    post.date = updateDate;
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