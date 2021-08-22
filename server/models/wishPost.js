const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wishPostSchema = new Schema(
    {
        _id:{
            type: Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        img: {
            type: String,
            required: false
        },
        tag: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
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

module.exports = wishPostSchema;