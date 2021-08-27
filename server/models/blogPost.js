/**
 * Individual Blog Post Schema, child schema to Blog
 */
const mongoose = require('mongoose');
const Image = require('./blogPostImage');

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
            data: Buffer,
            contentType: String,
            required: false
        },
        date: {
            type: Date,
            required: true
        }
    }, {
        timestamps: true
    }
    
)

module.exports = blogPostSchema;