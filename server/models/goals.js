import mongoose from 'mongoose';
// Destructuring of Schema property from mongoose and giving it a value
const { Schema: _Schema } = mongoose;

const GoalsSchema = new _Schema(
    {
        _id: {
            type: _Schema.Types.ObjectId,
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
    }
);

export default GoalsSchema