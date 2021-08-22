const mongoose = require('mongoose');
const interestPost = require('./interestPost');

const Schema = mongoose.Schema;

const interestSchema = new Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true
        },
        academicInterests: {
            type: [interestPost],
            required: true
        },
        personalInterests: {
            type: [interestPost],
            required: true
        },
    }, {    
        timestamps: true
    }
)

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;