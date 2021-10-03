import mongoose from 'mongoose';

const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: [String],
        required: true,
    },
    genres: {
        type: [String],
    },
    price: {
        type: Number,
        required: true,
        // pattern: "^(\d+(\.\d{0,2})?|\.?\d{1,2})$"
    },
    pages: {
        type: Number
    },
    publishing_house: {
        type: String
    },
    year_published: {
        type: Number
    },
    amount: {
        type: Number
    },
    image_Url: {
        type: String
    },
    description: {
        type: String
    }
});

export const Book = mongoose.model('Book', bookSchema);