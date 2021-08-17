const mongoose = require('mongoose');

const { Schema: _Schema } = mongoose;

const wishListSchmea = new _Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        wishes: [
            {
                _id:{
                    type: _Schema.Types.ObjectId,
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
            }
        ]
    }, {
        timestamps: true
    }
)

const WishList = mongoose.model('WishList', wishListSchmea);

module.exports = WishList;