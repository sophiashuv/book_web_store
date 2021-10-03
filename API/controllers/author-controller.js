import _ from 'lodash';

import { Author } from '../schemas/Author.js';


export class AuthorController {
    static async getAuthor(req, res) {
        const { authorId } = req.params;
        const author = await Author.findById(authorId);

        res.status(200).json(author);
    }
}