import _ from 'lodash';

import { Author } from '../schemas/Author.js';



export class AuthorController {
    static async getAuthor(req, res) {
        const { authorId } = req.params;
        const author = await Author.findById(authorId);

        res.status(200).json(author);
    }

    static async createAuthor(req, res) {
        const {body} = req.body;
        const newAuthor = new Author(body);
        const created_author = await newAuthor.save();
        res.status(200).json(created_author);
    }
}