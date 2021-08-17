const mongoose = require('mongoose');
const Blog = require('../models/blog');

class BlogHelper{
    constructor(){
        this.createBlog = this.createBlog.bind(this);
    }

    async createBlog(req, res){

        const index = -1;
        const date = new Date();

        let newBlog = new Blog();
        newBlog._id = 1;
        newBlog.blogPosts = [{
            content: "first post",
            location: "somewhere",
            image: "some_pic.img",
            index: index,
            date: date
        }];

        await newBlog.save()
            .then(()=> res.json('Created new Blog!'))
            .catch((err) =>  res.status(400).json("Error: " + err));
    }
}

module.exports = BlogHelper;