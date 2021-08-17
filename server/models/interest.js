const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interestSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        academicInterests: [
            {
                interest: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                }
            }
        ],
        personalInterests: [
            {
                interest: {
                    type: String,
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

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;