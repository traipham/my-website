const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true,
        },
        blogPosts: [
            {
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
    }
)

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;