import express from 'express';

import { BookController } from './controllers/books-controller.js';
import { AuthController } from './controllers/auth-controller.js';
import { OrderController } from './controllers/order-controller.js';
import { AuthorController } from './controllers/author-controller.js';
import { UserController } from './controllers/user-controller.js';
import {isAuthorizedMiddleware} from "./helpers/auth.js";

const router = express.Router()


/** User routes */
router.post("/signup", UserController.signup);
router.post("/signin", UserController.signin);

/** Auth routes */
router.get("/anonymousToken", AuthController.getAnonToken);

/** Books routes */
router.get('/books', BookController.getAllBooks);
router.get('/books/:bookId', BookController.getBook);
router.get('/books/:bookId/authors', BookController.getBookAuthors);

/** Authors routes */
router.get('/authors/:authorId', AuthorController.getAuthor);


/** Orders routes */
router.get('/order', OrderController.getOrder);
router.post('/order', OrderController.createOrder);
router.put('/order/item', OrderController.addItemToOrder);

router.use(isAuthorizedMiddleware);
router.patch('/order', OrderController.changeOrderStatus);

export default router;

