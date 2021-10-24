import express from 'express';

import { BookController } from './controllers/books-controller.js';
import { AuthController } from './controllers/auth-controller.js';
import { OrderController } from './controllers/order-controller.js';
import { AuthorController } from './controllers/author-controller.js';
import { UserController } from './controllers/user-controller.js';
import {isAdmin, isAuthorizedMiddleware} from "./helpers/auth.js";

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


router.use(isAuthorizedMiddleware);
/** Orders routes */
router.get('/order', OrderController.getOrder);
router.get('/orders', OrderController.getSubmittedOrders);
router.post('/order', OrderController.createOrder);
router.put('/order/item', OrderController.addItemToOrder);
router.patch('/orders', OrderController.changeOrderStatus);
router.delete('/order', OrderController.deleteOrder);

router.use(isAdmin);
router.post('/books', BookController.createBook);
router.post('/authors', AuthorController.createAuthor);
router.put('/books', BookController.discount);

export default router;

