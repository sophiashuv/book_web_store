import _ from 'lodash';
import jwt from 'jsonwebtoken';

import {Book} from '../schemas/Book.js';
import {Author} from '../schemas/Author.js';

export class BookController {

    static async getAllBooks(req, res) {
        const {genres, searchTerm, sort = 'title', offset = 0, limit = 10} = req.query;

        const booksFilter = _.pickBy({
            $text: searchTerm && {$search: searchTerm},
            genres: genres && {$in: genres.split(',')}
        });

        const totNumberOfBooksPromise = Book
            .find(booksFilter).count()

        const booksPromise = Book
            .find(booksFilter)
            .sort(sort)
            .skip(Number(offset)).limit(Number(limit));

        const [totNumberOfBooks, books] = await Promise.all([totNumberOfBooksPromise, booksPromise])
        // res.status(200).json({count: books.length, books: books.slice(Number(offset), Number(limit) + Number(offset))});
        res.status(200).json({count: totNumberOfBooks, books: books});
        // res.status(200).json(books);
    }

    static async getBook(req, res) {
        const {bookId} = req.params;
        const book = await Book.findById(bookId);

        res.status(200).json(book);
    }

    static async getBookAuthors(req, res) {
        const {bookId} = req.params;
        const book = await Book.findById(bookId);
        const author_promises = book.authors.map(authorId => {
            return Author.findById(authorId)
        })
        const authors = await Promise.all(author_promises)
        res.status(200).json(authors);
    }

    static async createBook(req, res) {
        const newBook = new Book(req.body);
        const created_book = await newBook.save();
        res.status(200).json(created_book);
    }

    static async discount(req, res) {
        const { genres, discount } = req.body;

        const booksFilter = _.pickBy({
            genres: genres && { $in: genres },
        });

        const books = await Book.find(booksFilter);
        books.forEach((book) => {
            book.price *= (100 - discount) / 100;
            book.save();
        });

        res.status(200).json(books);
    }

}