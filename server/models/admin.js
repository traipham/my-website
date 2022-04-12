const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            require: true
        }, 
        pw: {
            type: String,
            required: true
        }
    }
)

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;