import _ from 'lodash';

import { Book } from '../schemas/Book.js';
import { Author } from '../schemas/Author.js';
export class BookController {

    static async getAllBooks(req, res) {
        const { genres, title, sort='title', offset = 0, limit = 10 } = req.query;

        const booksFilter = _.pickBy({
            title,
            genres: genres && { $in: genres.split(',')}
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
        const { bookId } = req.params;
        const book = await Book.findById(bookId);

        res.status(200).json(book);
    }

    static async getBookAuthors(req, res) {
        const { bookId } = req.params;
        const book = await Book.findById(bookId);
        const author_promises = book.authors.map(authorId => {
            return Author.findById(authorId)
        })
        const authors = await Promise.all(author_promises)
        res.status(200).json(authors);
    }
}