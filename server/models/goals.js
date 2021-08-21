const mongoose = require('mongoose');
const GoalPost = require('./goalPost');
// Destructuring of Schema property from mongoose and giving it a value
const { Schema: _Schema } = mongoose;

const goalsSchema = new _Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        goals: {
            type: [GoalPost],
            required: true
        }
    }, {
        timestamps: true
    });

const Goals = mongoose.model('Goals', goalsSchema);

module.exports = Goals;