import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        blogPosts: [
            {
                content: {
                    type: String,
                    required: false
                },
                location: {
                    type: String,
                    required: false
                },
                image: {
                    type: String,
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

export default BlogSchema;