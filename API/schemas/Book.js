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
        required: true
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
    qty: {
        type: Number
    },
    image_Url: {
        type: String
    },
    description: {
        type: String
    }
});

bookSchema.index({ title: 'text', description: 'text', publishing_house: 'text' });

export const Book = mongoose.model('Book', bookSchema);