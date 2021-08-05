import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const InterestSchema = new Schema(
    {
        _id: {
            type: Schema.Types.ObjectId,
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

export default InterestSchema;