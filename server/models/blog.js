const mongoose = require('mongoose');
// const BlogPost = require('./blogPost');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        blogPosts: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                content: {
                    type: String,
                    required: false
                },
                location: {
                    type: String,
                    required: false
                },
                image: {
                    type: String,
                    required: false
                },
                index: {
                    type: Number,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ]
    }, {
        timestamps: true
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;