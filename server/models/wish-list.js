import mongoose from 'mongoose';

const { Schema: _Schema } = mongoose;

const WishListSchmea = new _Schema(
    {
        _id: {
            type: _Schema.Types.ObjectId,
            required: true,
        },
        wishes: [
            {
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
            }
        ]
    }
)

export default WishListSchema;