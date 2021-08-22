const mongoose = require('mongoose');
const wishPost = require('./wishPost');

// Destructuring
const { Schema: _Schema } = mongoose;

const wishListSchmea = new _Schema(
    {
        _id: {
            type: Number, // _Schema.Types.ObjectId
            required: true,
        },
        wishes: {
            type:[wishPost],
            required: true
        }
    }, {
        timestamps: true
    }
)

const WishList = mongoose.model('WishList', wishListSchmea);

module.exports = WishList;