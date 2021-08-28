const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const goalPostSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        tagColor: {
            type: String,
            required: true
        },
        // index: {
        //     type: Number,
        //     required: true
        // },
        date: {
            type: Date,
            required: true
        }
    }, {
        timestamp: true
    }
)

module.exports = goalPostSchema;