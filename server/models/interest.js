const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const interestSchema = new Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true
        },
        academicInterests: [
            {
                _id:{
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
            }
        ],
        personalInterests: [
            {
                _id:{
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
            }
        ]
    }, {
        timestamps: true
    }
)

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;