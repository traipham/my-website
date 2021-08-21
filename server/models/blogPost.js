const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPostSchema = new Schema(
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
    }, {
        timestamps: true
    }
    
)

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;