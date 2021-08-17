const mongoose = require('mongoose');
// Destructuring of Schema property from mongoose and giving it a value
const { Schema: _Schema } = mongoose;

const goalsSchema = new _Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        goals: [
            {
                content: {
                    type: String,
                    required: true
                },
                tagColor: {
                    type: String,
                    required: true
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
    });

const Goals = mongoose.model('Goals', goalsSchema);

module.exports = Goals;