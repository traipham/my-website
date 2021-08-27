/**
 * Parent Blog schema that contains array of child blogPost
 */
const mongoose = require('mongoose');
const blogPost = require('./blogPost');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        blogPosts: {
            type: [blogPost],
            required: true
        }
    }, {
        timestamps: true
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;