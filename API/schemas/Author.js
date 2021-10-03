import mongoose from 'mongoose';

const { Schema } = mongoose;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Number,
    },
    biography: {
        type: String,
    }
});

export const Author = mongoose.model('Author', authorSchema);