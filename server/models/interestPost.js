const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interestPostSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true
        },
        interest: {
            type: String,
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

module.exports = interestPostSchema;