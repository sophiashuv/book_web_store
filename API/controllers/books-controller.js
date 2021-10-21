import _ from 'lodash';
import jwt from 'jsonwebtoken';

import {Book} from '../schemas/Book.js';
import {Author} from '../schemas/Author.js';

export class BookController {

    static async getAllBooks(req, res) {
        let {genres, searchTerm, sort = 'title', offset = 0, limit = 8} = req.query;
        // offset = (page - 1) * 8;

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
        const next = offset < totNumberOfBooks;
        res.status(200).json({count: totNumberOfBooks, next: next, books: books});
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
        const {body} = req.body;
        const newBook = new Book(body);
        const created_book = await newBook.save();
        res.status(200).json(created_book);
    }

    static async discount(req, res) {
        const { genres, discount } = req.body.body;

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